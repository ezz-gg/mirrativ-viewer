import requests,multiprocessing,time,random

id=input('MirrativURL > ').split("/live/")[1]
amount=int(input("Amount　>　"))

headers={
  "user-agent":"Mozilla/5.0",
  "x-referer":"https://google.com/"
}

proxys=open("proxy.txt","r").read().splitlines()

count=0

def player(p):
    try:
        session=requests.Session()
        session.proxies={'http':p,'https':p}
        session.headers={
            "user-agent":"Mozilla/5.0",
            "x-referer":"https://mirrativ.com/"
        }
        live=session.get("https://www.mirrativ.com/live/"+id,timeout=5)
        cookie=live.cookies.get_dict()
        print("[+] トークンを取得しました: "+str(str(live.text.split('"csrf-token" content="')[1]).split('"')[0]))
        headers["x-referer"]="https://www.mirrativ.com/live/"+id
        headers["x-csrf-token"]=str(live.text.split('name="csrf-token" content="')[1]).split('"')[0]
        r=session.get("https://www.mirrativ.com/api/live/live?live_id="+id,cookies=cookie,timeout=5)
        if r.status_code==200:
            if not "online_user_num" in r.json():
                return print("[!] 入室できませんでした: "+headers["x-csrf-token"])
            else:
                return print("[+] 入室しました: "+headers["x-csrf-token"])
        elif r.status_code==403:
            return print("[!] 対策されたかIPが規制されました")
        elif r.status_code==429:
            return print("[!] レートリミット")
        else:
            return print("[!] エラー")
    except:
        return print("[!] エラー")

for i in [multiprocessing.Process(target=player,args=(random.choice(proxys),)) for _ in range(amount)]:
  i.start()
