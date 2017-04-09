package main

import (
	"log"
	"net/http"

	"github.com/codegangsta/negroni"

	"./routes"
)

func main() {
	router := routes.Init()
	n := negroni.Classic()
	n.UseHandler(router)

	server := &http.Server{
		Handler: n,
		Addr:    "localhost:3001",
	}

	log.Fatal(server.ListenAndServe())
}
