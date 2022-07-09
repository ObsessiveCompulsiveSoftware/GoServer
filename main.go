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

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Somebody opened a socket!")
	fmt.Fprintf(w, "Hello World")
}

func setupRoutes() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/ws", wsEndpoint)
}

func main() {
	fmt.Println("SERVER is starting...")
	setupRoutes()
	log.Fatal(http.ListenAndServe(":8080", nil))
	fmt.Println("SERVER started successfully.")
}
