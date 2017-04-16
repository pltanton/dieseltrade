package routes

import (
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"

	"../../handlers"
)

func initStatic(r *mux.Router) {
	fileServer := http.FileServer(http.Dir("dist"))

	r.PathPrefix("/login").Handler(negroni.New(
		negroni.HandlerFunc(handlers.RedirectIfLoggedIn),
		negroni.Wrap(http.StripPrefix("/login", fileServer)),
	))
	r.PathPrefix("/admin").Handler(negroni.New(
		negroni.HandlerFunc(handlers.RequireTokenAuth),
		negroni.Wrap(http.StripPrefix("/admin", fileServer)),
	))
	r.PathPrefix("/").Handler(fileServer)
}
