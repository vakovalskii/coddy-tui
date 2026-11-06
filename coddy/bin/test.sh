#!/bin/sh
# Тесты форка: весь vitest core и cli с английской локалью (иначе yargs и toLocaleString дают русский текст),
# падения сверяются со списком известных — coddy/test-known-failures.txt. Красный только на новых падениях.
#
#   coddy/bin/test.sh              # core + cli (~20 мин)
#   coddy/bin/test.sh cli          # один пакет
#   CODDY_TUI_UPDATE_KNOWN=1 coddy/bin/test.sh   # переписать список известных по текущему прогону (после разбора!)
#
# Известные падения — тесты апстрима на то, что форк убрал нарочно (провайдеры Alibaba/Qwen OAuth, проверка
# обновлений, opentui-диалоги входа), и нестабильные под нагрузкой.
set -u

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
KNOWN="$ROOT/coddy/test-known-failures.txt"
OUT=$(mktemp -d)
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

pkgs="${*:-core cli}"
fixed=""
for pkg in $pkgs; do
  echo "▸ $pkg"
  # coverage выключен: он медленнее и падает на гонке за coverage/.tmp, а падение прятало весь прогон
  (cd "$ROOT/packages/$pkg" && npx vitest run --maxWorkers=50% --coverage.enabled=false 2>&1) |
    sed 's/\x1b\[[0-9;]*m//g' | tee "$OUT/$pkg.log" | grep -E '^ *(Test Files|Tests) ' || true
  if ! grep -qE '^ *Test Files ' "$OUT/$pkg.log"; then
    printf '✗ %s: vitest не дошёл до сводки, лог: %s\n' "$pkg" "$OUT/$pkg.log"
    tail -20 "$OUT/$pkg.log"
    exit 1
  fi
  grep -E '^ FAIL ' "$OUT/$pkg.log" | sed -E 's/^ FAIL +//; s/ [0-9]+ms$//' | sed "s|^|$pkg: |" | sort -u >>"$OUT/failed.txt"
done
touch "$OUT/failed.txt"
# comm сравнивает только отсортированное: пакеты дописывают падения по очереди (core, затем cli)
sort -u -o "$OUT/failed.txt" "$OUT/failed.txt"

if [ -n "${CODDY_TUI_UPDATE_KNOWN:-}" ]; then
  { grep -v -E "^($(echo "$pkgs" | tr ' ' '|')): " "$KNOWN" 2>/dev/null; cat "$OUT/failed.txt"; } | sort -u >"$KNOWN.new"
  mv "$KNOWN.new" "$KNOWN"
  echo "список известных обновлён: $(wc -l <"$KNOWN" | tr -d ' ') тестов"
  exit 0
fi

new=$(comm -23 "$OUT/failed.txt" "$(sort -u "$KNOWN" >"$OUT/known.txt"; echo "$OUT/known.txt")")
fixed=$(comm -13 "$OUT/failed.txt" "$OUT/known.txt" | grep -E "^($(echo "$pkgs" | tr ' ' '|')): " || true)
[ -n "$fixed" ] && printf '\nпочинились (можно убрать из списка):\n%s\n' "$fixed"
if [ -n "$new" ]; then
  printf '\n✗ новые падения:\n%s\n\nлоги: %s\n' "$new" "$OUT"
  exit 1
fi
echo "✓ новых падений нет ($(wc -l <"$OUT/failed.txt" | tr -d ' ') известных)"
rm -rf "$OUT"
