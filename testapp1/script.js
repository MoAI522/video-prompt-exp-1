document.addEventListener('DOMContentLoaded', function() {
    // 要素の取得
    const checkboxes = document.querySelectorAll('input[name="dream-item"]');
    const dreamButton = document.getElementById('dream-button');
    const resultElement = document.getElementById('result');
    
    // チェックされた順番を保存する配列
    let checkOrder = [];
    // 現在チェックされているアイテムを追跡する配列
    let checkedItems = [];
    
    // チェックボックスの変更を監視
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(event) {
            const itemName = event.target.dataset.name;
            
            if (event.target.checked) {
                // チェックされた場合、名前を順番配列に追加
                checkOrder.push(itemName);
                checkedItems.push(itemName);
            } else {
                // チェックが外された場合、順番配列から一度すべて削除して再構築
                checkedItems = checkedItems.filter(item => item !== itemName);
                
                // 順序配列をリセットして現在チェックされているアイテムだけの順序で再構築
                checkOrder = checkOrder.filter(item => checkedItems.includes(item));
            }
        });
    });
    
    // ボタンクリック時の処理
    dreamButton.addEventListener('click', function() {
        // チェックされたボックスを取得
        const checkedBoxes = Array.from(checkboxes).filter(cb => cb.checked);
        
        // チェックされたボックスの名前を取得
        const checkedNames = checkedBoxes.map(cb => cb.dataset.name);
        
        // 結果テキストを決定
        let resultText = getResultText(checkedBoxes, checkedNames, checkOrder);
        
        // 結果を表示
        resultElement.textContent = resultText;
    });
    
    // 結果テキストを決定する関数
    function getResultText(checkedBoxes, checkedNames, checkOrder) {
        const count = checkedBoxes.length;
        
        // チェック数に応じた結果テキスト
        if (count === 0) {
            return "ふつう";
        } else if (count === 1) {
            return "ちょっとめでたい";
        } else if (count === 2) {
            // 「鷹」と「茄子」の組み合わせを確認
            if (checkedNames.includes('鷹') && checkedNames.includes('茄子')) {
                return "むしろおしい";
            } else {
                return "ばりめでたい";
            }
        } else if (count === 3) {
            // 3つすべてチェックされている場合
            
            // 特定の順番（富士山→鷹→茄子）をチェック
            const fujiIndex = checkOrder.indexOf('富士山');
            const takaIndex = checkOrder.indexOf('鷹');
            const nasuIndex = checkOrder.indexOf('茄子');
            
            if (fujiIndex !== -1 && takaIndex !== -1 && nasuIndex !== -1 && 
                fujiIndex < takaIndex && takaIndex < nasuIndex) {
                return "来年が怖いくらい";
            } else {
                return "超Happy New Year";
            }
        }
        
        return "";
    }
});
