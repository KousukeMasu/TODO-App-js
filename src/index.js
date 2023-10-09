// import "./styles.css";
//テキストボックスの値を取得し、初期化する
const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createImcompleteList(inputText);
};

//未完了リストに追加する関数
const createImcompleteList = (text) => {
  //liタグ生成
  const li = document.createElement("li");
  li.className = "list-row";

  //未完了リストにpタグ生成
  const p = document.createElement("p");
  p.innerText = text;

  //liタグの子要素にp要素を設定
  li.appendChild(p);
  // console.log(document.getElementById("incomplete-list"));

  //buttun（完了タグ）追加
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親タグ（li）を未完了エリアから削除（イベントの最初に持ってきてきているのは、liタグ以下の要素をnull（初期化）してからは何を削除すればいいかわからなくなるから。）
    deleteFromIncompleteList(completeButton.parentNode);

    //ここから完了エリアにタスクを移動するコード
    //完了ボタンの親要素を取得
    const addTarget = completeButton.parentNode;

    //TODOテキスト内容を取得
    const text = addTarget.firstElementChild.innerText;

    //li以下を初期化
    addTarget.textContent = null;

    //liタグの子要素にpタグ生成
    const p = document.createElement("p");
    p.innerText = text;

    //liタグ子要素に戻すbuttonタグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";

    //生成した戻すボタンを押したら完了リストから削除して、未完了リストに復活
    backButton.addEventListener("click", () => {
      const deleteTarget = backButton.parentNode;
      deleteFromCompleteList(backButton.parentNode);
      const text = deleteTarget.firstElementChild.innerText;
      createImcompleteList(text);
    });

    // liタグの子要素に戻すボタンを設定
    addTarget.appendChild(p);
    addTarget.appendChild(backButton);

    //完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  //button（削除タグ）の追加
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    alert("削除");
    //押された削除ボタンの親タグ（li）を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);
    // const deleteTaret = deleteButton.parentNode;
    // document.getElementById("incomplete-list").removeChild(deleteTaret);
  });

  //liタグの子要素に設定
  li.appendChild(completeButton);
  li.appendChild(deleteButton);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//完了リストから指定の要素を削除
const deleteFromCompleteList = (target) => {
  document.getElementById("complete-list").removeChild(target);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
