package routes

import (
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"

	"../handlers"
)

func initSessionRoutes(r *mux.Router) {
	r.Handle("/session", negroni.New(
		negroni.HandlerFunc(handlers.InitSession),
		negroni.HandlerFunc(handlers.GenerateJWT),
	)).Methods("POST")
}
