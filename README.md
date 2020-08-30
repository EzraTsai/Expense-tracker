# Expense-tracker - 家庭記帳本
一個使用Express 與 Node.js + Express-Handlebars + Mongodb 開發的記帳本小程式

# Project Capture - 專案畫面
![image](https://github.com/EzraTsai/Expense-tracker/blob/master/Picture/Picture%201.PNG)
![image](https://github.com/EzraTsai/Expense-tracker/blob/master/Picture/Picture%202.PNG)

# Features - 產品功能
* 測試帳號: user@example.com，測試密碼: 123456，測試連結:Heroku <https://powerful-garden-24074.herokuapp.com/users/login>
* 在首頁一次瀏覽所有支出的清單  
* 在首頁看到所有支出清單的總金額  
* 新增一筆支出  
* 編輯支出的所有屬性 (一次只能編輯一筆)  
* 刪除任何一筆支出 (一次只能刪除一筆)  
* 可以根據「類別」及「日期」篩選支出；總金額的計算只會包括被篩選出來的支出總和。

# Environment SetUp - 環境建置與需求
* Node.js v10.15.0  
* Express v4.17.1  
* Express-Handlebars v4.0.4  
* MONGODB 

# Installing - 安裝與執行步驟
1. 下載專案到本機  
`git clone https://github.com/ShinTingTsai/expense-tracker.git`  
2. 安裝套件  
`cd expense-tracker`  
`npm install`  
3. 資料庫連線  
`cd ~/mongodb/bin/`  
`./mongod --dbpath /Users/sttsai/mongodb-data`     
4. 執行腳本  
`npm run seed`  
5. 新增.env 檔，並前往facebooks for developers獲取必要數據  
`//請自行至facebooks for developers創建專案`  
$ FACEBOOK_ID='創建的facebook開發專案id'`  
$ FACEBOOK_SECRET='創建的facebook開發專案secret'`  
$ FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback`  
6. 開啟程式  
`npm run dev`  
請至http://localhost:3000開始使用程式

# Contributor - 開發人員
Ezra Tsai
