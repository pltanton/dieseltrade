package config

import (
	"log"
	"net/http"

	"github.com/codegangsta/negroni"

	"../storage"
	"./routes"
)

// InitAndRun initializes application and starts a server
func InitAndRun() {
	storage.Init()
	defer storage.Close()
	router := routes.Init()

	n := negroni.Classic()
	n.UseHandler(router)

	server := &http.Server{
		Handler: n,
		Addr:    "localhost:3001",
	}

	log.Fatal(server.ListenAndServe())
}
