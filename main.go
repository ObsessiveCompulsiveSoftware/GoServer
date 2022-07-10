package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// We'll need to define an Upgrader
// this will require a Read and Write buffer size
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Somebody connected!")
	http.ServeFile(w, r, "app/public/index.html")
}

func globalJs(w http.ResponseWriter, r *http.Request) {
	fmt.Println("/global.js served")
	http.ServeFile(w, r, "app/public/global.js")
}

func styleCss(w http.ResponseWriter, r *http.Request) {
	fmt.Println("/style.css served")
	http.ServeFile(w, r, "app/public/style.css")
}

func reader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		log.Println(string(p))
		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}
func strawEndpoint(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Straw attempt")
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	fmt.Println("Straw connected.")
	reader(ws)
	//defer ws.Close()
}

func setupRoutes() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/global.js", globalJs)
	http.HandleFunc("/style.css", styleCss)
	http.HandleFunc("/straw", strawEndpoint)
}

func main() {
	fmt.Println("SERVER is starting...")
	setupRoutes()
	log.Fatal(http.ListenAndServe(":8080", nil))
	//fmt.Println("SERVER started successfully.")
}
