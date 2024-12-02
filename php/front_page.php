<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>輔助運動系統</title>
    <link rel="stylesheet" href="../assets/css/front_page.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap" rel="stylesheet">
</head>
<body>
    <header class="navbar" id="navbar">
        <h1>整合肢體辨識技術的創新輔助系統</h1>
        <div class="link">
            <a href="login_page.php">登入</a>
        </div>
    </header>        

    <main>
        <section class="show-container">
            <div class="gallery-container">        
                <div class="gallery-slider" id="gallerySlider">
                    <img src="../assets/img/ex7.jpg" alt="圖片展示 7">
                    <img src="../assets/img/ex1.jpg" alt="圖片展示 1">
                    <img src="../assets/img/ex2.jpg" alt="圖片展示 2">
                    <img src="../assets/img/ex3.jpg" alt="圖片展示 3">
                    <img src="../assets/img/ex4.jpg" alt="圖片展示 4">
                    <img src="../assets/img/ex5.jpg" alt="圖片展示 5">
                    <img src="../assets/img/ex6.jpg" alt="圖片展示 6">
                    <img src="../assets/img/ex7.jpg" alt="圖片展示 7">
                    <img src="../assets/img/ex1.jpg" alt="圖片展示 1">
                </div>
                <button id="prevBtn" class="gallery-button">&lt;</button>
                <button id="nextBtn" class="gallery-button">&gt;</button>
            </div>        
        </section>

        <section class="introduction-container">
            <h2 class="introduction">關於本專題</h2>
            <p class="content">
                近年人工智慧領域飛速進展，機器學習的技術早已不可同日而語，其中深度學習廣泛運用於價格預測、複雜多樣的影像辨識、客服回復與問題分類等，也可以做細部的臉部情緒辨識與肢體動作辨別判斷。而隨之高齡化逐漸地攀升、高齡人口增加，台灣將於西元2025年進入超高齡化社會，我們觀察周圍長輩，發現老人家關節膝蓋等隨著時間流逝的老化問題，而適度的復健運動可以減緩身體機能退化的速度。因此本研究藉由鏡頭獲取視訊畫面，加上肢體動作辨識，搭配遊戲設計與後端資料庫串接，與使用者互動來引導老人適度運動，以寓運動於樂為研究方向。考慮到年長者是否能達到指定的動作，我們諮詢了運動休閒系教授，並且採用「KNN近鄰演算法」(K-Nearest Neighbor)訓練模型，並設計出具挑戰性的易操控的簡單遊戲。本研究參考TensorFlow的Pose-net模型中的「深度學習」（Deep Learning），並設計人體辨識系統，利用KNN演算法建立其模型。以此為基準結合臉部辨識的使用者辨識。希望老人家能透過本研究來減緩身體逐齡老化所累積造成的負擔，並達到養成持續長期運動習慣的效果。
            </p>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 南華大學資訊工程系萌萌實驗室110級專題. 版權所有.</p>
    </footer>

    <script src="../assets/js/front_page.js"></script>
</body>
</html>
