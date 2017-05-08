package routes

import (
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"

	"../../handlers"
)

func initFileRoutes(r *mux.Router) {
	r.Handle("/filesindex", negroni.New(
		negroni.HandlerFunc(handlers.FilesIndex),
	)).Methods("GET")

	r.Handle("/file", negroni.New(
		negroni.HandlerFunc(handlers.RequireTokenAuth),
		negroni.HandlerFunc(handlers.SaveFile),
	)).Methods("POST")

	r.Handle("/file/{filename}", negroni.New(
		negroni.HandlerFunc(handlers.RequireTokenAuth),
		negroni.HandlerFunc(handlers.DeleteFile),
	)).Methods("DELETE")
}
