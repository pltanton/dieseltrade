package routes

import (
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"

	"../../handlers"
)

func initStatic(r *mux.Router) {
	webAppServer := http.FileServer(http.Dir("dist"))
	fileServer := http.FileServer(http.Dir("files"))

	r.PathPrefix("/file").Handler(http.StripPrefix("/file", fileServer))

	r.PathPrefix("/login").Handler(negroni.New(
		negroni.HandlerFunc(handlers.RedirectIfLoggedIn),
		negroni.Wrap(http.StripPrefix("/login", webAppServer)),
	))

	r.PathPrefix("/admin").Handler(negroni.New(
		negroni.HandlerFunc(handlers.RequireTokenAuth),
		negroni.Wrap(http.StripPrefix("/admin", webAppServer)),
	))

	r.PathPrefix("/").Handler(webAppServer)
}
