package routes

import (
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"

	"../handlers"
)

func initDataRoutes(r *mux.Router) {
	r.Handle("/data", negroni.New(
		negroni.HandlerFunc(handlers.GetData),
	)).Methods("GET")
}
