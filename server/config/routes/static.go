package routes

import (
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"

	"../../handlers"
)

func initStatic(r *mux.Router) {
	fileServer := http.FileServer(http.Dir("dist"))
	r.PathPrefix("/admin").Handler(negroni.New(
		negroni.HandlerFunc(handlers.RequireTokenAuth),
		negroni.Wrap(http.StripPrefix("/admin", fileServer)),
	))
	r.PathPrefix("/").Handler(fileServer)
}
