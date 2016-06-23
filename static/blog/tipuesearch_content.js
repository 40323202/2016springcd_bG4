var tipuesearch = {"pages":[{"url":"https://40323203.github.io/2016springcd_bG4/static/blog/40323205-qi-mo-bao-gao.html","text":"期末報告 自評分數：70分 1. 繪製2D齒輪零件： Openshift： http://bg4cdw11-40323205.rhcloud.com/bg4_40323205/gearwheel 先使用以下程式碼，繪製出2D齒輪零件，並存成html檔 window.onload=function(){ brython(1); } import spurmain from browser import document, html # 利用 Brython 的 document 建立一個 id 為 container 的 div 區域, 然後在其中放入對應的 html 標註 container = document['container'] # 3個齒輪的齒數 n1 = 17 n2 = 29 n3 = 15 # 根據繪圖的 3 個齒輪大小計算所需的畫布高度 height = 1.2*800*0.8/(int(n1)+int(n2)+int(n3))*max([int(n1), int(n2), int(n3)]) # 決定畫布的 id 字串 id = \"gear\" # 利用 Brython 的 html 方法建立 CANVAS canvas = html.CANVAS(id=id, width=800, height=height) # 將所建立的 canvas 畫布標註放入 container container <= canvas # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth # 利用 80% 的畫布寬度進行繪圖 # 計算模數的對應尺寸 m = canvas.width*0.8/(n1+n2+n3) # 根據齒數與模組計算各齒輪的節圓半徑 pr1 = n1*m/2 pr2 = n2*m/2 pr3 = n3*m/2 # 畫布左右兩側都保留畫布寬度的 10% # 依此計算對應的最左邊齒輪的軸心座標 cx = canvas.width*0.1+pr1 cy = canvas.height/2 # pa 為壓力角 pa = 25 # 這裡的齒輪繪圖以所導入的 spurmain 模組中的 Spur 類別建立對應的 gear 變數, 且宣告畫布 id gear = spurmain.Spur(id) # 畫最左邊齒輪, 定位線旋轉角為 0, 軸心座標 (cx, cy) gear.spur(cx, cy, m, n1, pa, 0) # 第2個齒輪將原始的定位線逆時鐘轉 180 度後, 與第1個齒輪正好齒頂與齒頂對齊 # 只要第2個齒輪再逆時鐘或順時鐘轉動半齒的角度, 即可完成囓合 # 每一個齒分別包括從齒根到齒頂的範圍, 涵蓋角度為 360/n, 因此所謂的半齒角度為 180/n gear.spur(cx+pr1+pr2, cy, m, n2, pa, 180-180/n2) # 第2齒與第3齒的囓合, 首先假定第2齒的定位線在 theta 角為 0 的原始位置 # 如此, 第3齒只要逆時鐘旋轉 180 度後, 再逆時鐘或順時鐘轉動半齒的角度, 即可與第2齒囓合 # 但是第2齒為了與第一齒囓合時, 已經從原始定位線轉了 180-180/n2 度 # 而當第2齒從與第3齒囓合的定位線, 逆時鐘旋轉 180-180/n2 角度後, 原先囓合的第3齒必須要再配合旋轉 (180-180/n2 )*n2/n3 gear.spur(cx+pr1+pr2+pr2+pr3, cy, m, n3, pa, 180-180/n3+(180-180/n2)*n2/n3) 再使用以下程式碼，即可將html檔轉變為py檔，利於上傳至Openshift。 @bg4_40323205.route('/gearwheel', defaults={'n1':7,'n2':13,'n3':10,'n4':17}) @bg4_40323205.route('/gearwheel/ / / / ') def gearwheel(n1, n2, n3, n4): # 真正最後的架構應該要在函式中準備繪圖所需的資料, 然後用 template 呈現內容 title = \"網際 2D 繪圖\" head = ''' <!DOCTYPE html> '''+ title +''' ''' script = ''' window.onload=function(){ brython(1); } ''' headstring = head + script + \" \" # 能否根據 n1, n2, n3 與 width, 算出合理的 height # 模數計算 m = canvas.width 0.8/(n1+n2+n3) # max([int(n1), int(n2), int(n3)]) # 所以 height = 1.2 800 0.8/(int(n1)+int(n2)+int(n3)) max([int(n1), int(n2), int(n3)]) height = 1.2 800 0.8/(int(n1)+int(n2)+int(n3)+int(n4))*max([int(n1), int(n2), int(n3), int(n4)]) body = ''' # 將 導入的 document 設為 doc 主要原因在於與舊程式碼相容 from browser import document as doc # 由於 Python3 與 Javascript 程式碼已經不再混用, 因此來自 Javascript 的變數, 必須居中透過 window 物件轉換 from browser import window # 針對 Javascript 既有的物件, 則必須透過 JSConstructor 轉換 from javascript import JSConstructor import math # 主要用來取得畫布大小 canvas = doc[\"gear1\"] # 此程式採用 Cango Javascript 程式庫繪圖, 因此無需 ctx #ctx = canvas.getContext(\"2d\") # 針對類別的轉換, 將 Cango.js 中的 Cango 物件轉為 Python cango 物件 cango = JSConstructor(window.Cango) # 針對變數的轉換, shapeDefs 在 Cango 中資料型別為變數, 可以透過 window 轉換 shapedefs = window.shapeDefs # 目前 Cango 結合 Animation 在 Brython 尚無法運作, 此刻只能繪製靜態圖形 # in CangoAnimation.js #interpolate1 = window.interpolate # Cobi 與 createGearTooth 都是 Cango Javascript 程式庫中的物件 cobj = JSConstructor(window.Cobj) creategeartooth = JSConstructor(window.createGearTooth) # 經由 Cango 轉換成 Brython 的 cango, 指定將圖畫在 id=\"plotarea\" 的 canvas 上 cgo = cango(\"gear1\") ###################################### # 畫正齒輪輪廓 ##################################### def spur(cx, cy, m, n, pa, theta): # n 為齒數 #n = 17 # pa 為壓力角 #pa = 25 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth #m = 0.8*canvas.width/n # pr 為節圓半徑 pr = n*m/2 # gear Pitch radius # generate gear data = creategeartooth(m, n, pa) # Brython 程式中的 print 會將資料印在 Browser 的 console 區 #print(data) gearTooth = cobj(data, \"SHAPE\", { \"fillColor\":\"#ddd0dd\", \"border\": True, \"strokeColor\": \"#606060\" }) #gearTooth.rotate(180/n) # rotate gear 1/2 tooth to mesh, 請注意 rotate 角度為 degree # theta 為角度 gearTooth.rotate(theta) # 單齒的齒形資料經過旋轉後, 將資料複製到 gear 物件中 gear = gearTooth.dup() # gear 為單一齒的輪廓資料 #cgo.render(gearTooth) # 利用單齒輪廓旋轉, 產生整個正齒輪外形 for i in range(1, n): # 將 gearTooth 中的資料複製到 newTooth newTooth = gearTooth.dup() # 配合迴圈, newTooth 的齒形資料進行旋轉, 然後利用 appendPath 方法, 將資料併入 gear newTooth.rotate(360*i/n) # appendPath 為 Cango 程式庫中的方法, 第二個變數為 True, 表示要刪除最前頭的 Move to SVG Path 標註符號 gear.appendPath(newTooth, True) # trim move command = True # 建立軸孔 # add axle hole, hr 為 hole radius hr = 0.6*pr # diameter of gear shaft shaft = cobj(shapedefs.circle(hr), \"PATH\") shaft.revWinding() gear.appendPath(shaft) # retain the 'moveTo' command for shaft sub path gear.translate(cx, cy) # render 繪出靜態正齒輪輪廓 cgo.render(gear) # 接著繪製齒輪的基準線 deg = math.pi/180 Line = cobj(['M', cx, cy, 'L', cx+pr*math.cos(theta*deg), cy+pr*math.sin(theta*deg)], \"PATH\", { 'strokeColor':'blue', 'lineWidth': 1}) cgo.render(Line) # 3個齒輪的齒數 n1 = '''+str(n1)+''' n2 = '''+str(n2)+''' n3 = '''+str(n3)+''' n4 = '''+str(n4)+''' # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth # 利用 80% 的畫布寬度進行繪圖 # 計算模數的對應尺寸 m = canvas.width*0.8/(n1+n2+n3+n4) # 根據齒數與模組計算各齒輪的節圓半徑 pr1 = n1*m/2 pr2 = n2*m/2 pr3 = n3*m/2 pr4 = n4*m/2 # 畫布左右兩側都保留畫布寬度的 10% # 依此計算對應的最左邊齒輪的軸心座標 cx = canvas.width*0.1+pr1*0.2 cy = canvas.height/2 # pa 為壓力角 pa = 25 # 畫最左邊齒輪, 定位線旋轉角為 0, 軸心座標 (cx, cy) spur(cx, cy, m, n1, pa, 0) # 第2個齒輪將原始的定位線逆時鐘轉 180 度後, 與第1個齒輪正好齒頂與齒頂對齊 # 只要第2個齒輪再逆時鐘或順時鐘轉動半齒的角度, 即可完成囓合 # 每一個齒分別包括從齒根到齒頂的範圍, 涵蓋角度為 360/n, 因此所謂的半齒角度為 180/n spur(cx+pr1+pr2, cy, m, n2, pa, 180-180/n2) # 第2齒與第3齒的囓合, 首先假定第2齒的定位線在 theta 角為 0 的原始位置 # 如此, 第3齒只要逆時鐘旋轉 180 度後, 再逆時鐘或順時鐘轉動半齒的角度, 即可與第2齒囓合 # 但是第2齒為了與第一齒囓合時, 已經從原始定位線轉了 180-180/n2 度 # 而當第2齒從與第3齒囓合的定位線, 逆時鐘旋轉 180-180/n2 角度後, 原先囓合的第3齒必須要再配合旋轉 (180-180/n2 )*n2/n3 spur(cx+pr1+pr2+pr2+pr3, cy, m, n3, pa, 180-180/n3+(180-180/n2)*n2/n3) spur(cx+pr1+pr2+pr2+pr3+pr3+pr4, cy, m, n4, pa, 180-180/n4+(180-180/n3)*n3/n4) ''' bodystring = \" \" + body+\" \" endstring = \" \" outstring = headstring + bodystring + endstring return outstring # 若 template 檔案名稱與位於外部 templates 目錄中的檔案同名, 則取外部的 template # return render_template('g1index.html', user=user) 2. 繪製3D齒輪零件： 使用OnShape繪製零件，並組裝完成。 心得： 在使用第一個程式碼繪製齒輪零件時相當的順利，但要轉換到第二個程式碼後， 需要在近端檢查是否正確時，卻吃了閉門羹，詢問了同學好久，才發現是因為我們組內的檔案有亂碼， 導致我近端一直無法出現繪製的東西，刪除了亂碼後，就成功了。 繪製Onshape有發生滿多問題的，但最大的問題就是速度太慢，因為是線上的軟體，同時使用的人太多， 除了這個問題，其他的問題都還滿容易解決的。 本次作業讓我了解到Onshape還有很多功能未被我們開發，又多學到了一個東西！","tags":"bg4","title":"40323205 期末報告"},{"url":"https://40323203.github.io/2016springcd_bG4/static/blog/40323205-cdw13-bao-gao.html","text":"Openshift： http://bg4cdw11-40323205.rhcloud.com/bg4_40323205/eighteenthirty 心得： 本次作業是將鍊條翻轉成90度。 試驗了好幾次，只能將一開始的鏈條翻轉成60度後，就無法作業了， 後來詢問了同學，同學也很好心的告訴了我他的方法後， 照著同學做的方式，自己也更改了一些程式後，就完成了此次作業。 但鍊條是用微調的方法，不是使用算式，所以看起來有些許不同、奇怪。","tags":"bg4","title":"40323205 cdw13 報告"},{"url":"https://40323203.github.io/2016springcd_bG4/static/blog/40323205-cdw11-bao-gao.html","text":"1.AAAA Openshift： http://bg4cdw11-40323205.rhcloud.com/bg4_40323205/AAAAAAAA 2.BADC Openshift： http://bg4cdw11-40323205.rhcloud.com/bg4_40323205/BADCBADC 3.ABCD Openshift： http://bg4cdw11-40323205.rhcloud.com/bg4_40323205/ABCDABCD 圖片更改顏色前。網址裡的是更改顏色後。 ----------------------------------------------------------------------------- 心得： 這次的作業我認為更有小組一起運作的感覺。 把整組的資料放在其中一個組員的github裡，比起兩個班一起使用一個github，這種方法令人更安心。 也很感謝各個組員的教導！","tags":"bg4","title":"40323205 cdw11 報告"},{"url":"https://40323203.github.io/2016springcd_bG4/static/blog/40323203-qi-mo-bao-gao.html","text":"40323203-期末報告 自評分數 : 80 1.繪製2D零件步驟: 繪圖2D零件:fourgear openshift網站: http://cdw11-40323203.rhcloud.com/bg4_40323203/fourgear 2.程式新增部分: 3.繪製3D零件步驟: onshape零件位置: fourgear 期末心得: 期末是繪圖2D、3D正齒輪，2D部分主要是繪製四個齒數不同但是必須嚙合的齒輪， 我自己是設定n1=32、n2=21、n3=15、n4=10， 而3D部分則是要在onshape上繪製，一開始一樣要畫四個齒輪加一個板子將齒輪固定在上面， 在這個部分得知老師在上課有教到可以直接把齒輪叫出來，只要輸入齒數、模數、角度即可， 記得剛開始使用onshape的時候，沒有發現有其他的功能可以使用，操作部分比較之前學過軟體來的簡易，例如學過creo軟體，雖然看起來跟3D軟體雷同，可是卻覺得在功能上及操作上沒有設計的很好而且有點難操作，這學期的課程算是很充實。","tags":"bg4","title":"40323203 期末報告"},{"url":"https://40323203.github.io/2016springcd_bG4/static/blog/40323203-cdw11-bao-gao.html","text":"40323203-cdw11報告 1.建立組別操作步驟: got clone https://github.com/2015fallhw/cdw11.git →在cdw2目錄下→users→新增b資料夾→新增bg4資料夾→新增40323203.leo 打開40323203.leo→新增md檔及py檔 →將報告cdw11報告寫入md檔→存為40323203-cdw11.md →將繪製2D零件之方法寫入py檔→存為bg4_40323203.py 至myflaskapp.py→寫入自己的東西→才能夠在wsgi執行 至cmd輸入→python wsgi.py→至網頁輸入→localhost:5000/py檔/繪圖名稱→可在近端檢查零件是否畫錯 2.繪製2D零件步驟: (1)繪圖2D零件:AAAA openshift網站: http://cdw11-40323203.rhcloud.com/bg4_40323203/task4A (2)繪圖2D零件:BADC openshift網站: http://cdw11-40323203.rhcloud.com/bg4_40323203/taskBADC (3)繪圖2D零件:ABCD openshift網站: http://cdw11-40323203.rhcloud.com/bg4_40323203/taskABCD (4)繪圖2D零件:左18齒 右30齒 openshift網站: http://cdw11-40323203.rhcloud.com/bg4_40323203/circle2 第11週心得: 這一週作業是延續期中考的2D繪圖，方法大略相同需要改變X、Y的距離，另外有學習到: (1)def a(x, y, scale=1, color=\"green\")之程式碼，使用此程式碼就不需要在每一段程式碼後面多加一段顏色程式碼。 (2)@bg4_40323203.route('/circle36/ / / ')之程式碼，此為畫齒輪的程式，加入此可定義X、Y距離及角度大小。 其他連結: pelican 網誌位置: http://cdw11-ag100.rhcloud.com/static/ 分組程式: http://cdw11-ag100.rhcloud.com/option fileuploadform: http://cdw11-ag100.rhcloud.com/fileuploadform imageuploadform: http://cdw11-ag100.rhcloud.com/imageuploadform","tags":"bg4","title":"40323203 cdw11 報告"},{"url":"https://40323203.github.io/2016springcd_bG4/static/blog/40323203-cdw13-bao-gao.html","text":"40323203-cdw13報告 1.繪製2D零件步驟: 繪圖2D零件:chain openshift網站: http://cdw11-40323203.rhcloud.com/bg4_40323203/chain 2.程式修改部分: 第13週心得: 這一週是繪圖2D鍊條，作業是要將原本寫好鍊條程式旋轉90度， 改的部分則是startX、startY、first degree， 剛開始摸索你時候還不太瞭解， 最後進入狀況知道如何修改後就有跟上每週的進度了。","tags":"bg4","title":"40323203 cdw13 報告"},{"url":"https://40323203.github.io/2016springcd_bG4/static/blog/xie-tong-chan-pin-she-ji-shi-xi-qi-mo-kao-zhou-zhuan-an-bao-gao.html","text":"為了能夠更客觀進行各組與各學員的期末自評, 特別以組為單位, 各組員為內容建構成員, 利用四堂課程的時間, 在各組新建的 Github 倉儲中完成此一專案報告. 基本專案建置流程: 請各組推派代表, 在其 Github 帳號下, 建立一個分組期末專案倉儲, 倉儲名稱定為 2016springcd_aG1, 其中的 aG1 代表 a 班的第 1 組 (以下將以 2016springcd_xGx 代表各組建立的倉儲名稱), 請各組自行配合改為各自的組別代號, 而且請各組特別注意, 此一倉儲的建立時間, 必須是在各班期末考週的第1堂課程時間之後建立, 才納入計分. 倉儲建立之後的第1階段提交推送資料, 必須是修改 README.md, 而且必須透過協調, 由各組員依序 git clone 各組在代表組員帳號下所建立的 2016springcd_xGx 倉儲後, 分別由各組員自行用學號登錄的 github 帳號以協同提交推送的過程, 各自修改 README.md 檔案, 將自己的學號與個人對應的 Github Page 網頁, 放入 REAEME.md 檔案中. 第2項的評分依據為各組員必須自行用自己在 Github 登錄的帳號, 取得各組的 2016springcd_xGx 倉儲協同權限後, 再進行 RADEME.md 的協同修改, 之後各組員完成提交推送的紀錄, 必須可以在 commits 呈現各自的學號與提交推送內容及時間, 才納入計分. 各組以協同流程完成 README.md 的編修後, 接著請取用 https://github.com/2015fallhw/2016springcd_final 倉儲中的架構, 在各組的代表成員的 2016springcd_xGx 倉儲中運作, 並設法將其中的 pelican 網誌內容, 呈現在 2016springcd_xGx 倉儲的 gh-pages 分支中, 完成後, 請各組員在此一 gh-pages 倉儲中各自建立一個能夠呈現自我期末報告的網誌, 並且將此一在 2016springcd_xGx 倉儲的 gh-pages 分支中的連結, 放入 2016springcd_xGx 倉儲 master 分支的 README.md 最前方. 接著, 請利用協同產品設計實習課程所學到的 2D 網際繪圖內容, 以分組組員各自繪製一簡單幾何零件圖形的方式, 將 2016springcd_xGx 倉儲資料中的 wsgi 程式, 送到各組代表成員的 OpenShift 網站中呈現, 並將 2D 繪圖程式連結, 放到 2016springcd_xGx 倉儲 master 分支的 README.md 資料中, 並且放在分組 gh-pages 連結之後. 最後, 請各組以協同方式在 Onshape 雲端電腦輔助設計軟體中, 建立一個名稱為 2016springcd_xGx 的公開協同 Document, 然後將各組組員納入作為可以 edit 與 view 的協同者, 以每一位組員利用 Onshape 官方所釋出的 SG (正齒輪) FeatureScript, 分別依照學號排序, 從齒數 17 開始, 以每位學員遞增 2 齒的方式, 各自在 Part Studio 建立一個正齒輪零件, 並以學號命名零件後, 完成後, 以最簡單的方式在以組別 xGx 命名的組立件中完成囓合組立 (例如, 該組有 6 位成員, 則各自提供一個正齒輪零件, 齒數分別為 17, 19, 21, 23, 25, 27 等, 最後則完成6個齒輪的囓合組立), 完成後, 請將各組的囓合正齒輪組立件以 share 功能, 設定成網路公開組立件, 並將此一 Onshape 的組立件連結, 放到 2016springcd_xGx 倉儲 master 分支的 README.md 資料中, 放在分組 wsgi 2D 繪圖連結之後. 最最後, 請各組依序完成上述工作任務後, 將各組與各學員所完成的網站連結放入 https://github.com/2015fallhw/cdw11/wiki 各組員的對應資料區中, 以作為期末成績評分參考. 祝大家 2016 Summer 假期愉快!","tags":"ag100","title":"協同產品設計實習期末考週專案報告"}]};