package routes

import (
	"github.com/gorilla/mux"
)

// Init return initialised router
func Init() *mux.Router {
	r := mux.NewRouter()
	api := r.PathPrefix("/api/").Subrouter()
	initFileRoutes(api)
	initDataRoutes(api)
	initSessionRoutes(api)
	initStatic(r)
	return r
}
