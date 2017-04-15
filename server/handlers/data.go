package handlers

import (
	"io/ioutil"
	"log"
	"net/http"

	"github.com/boltdb/bolt"

	"../storage"
)

// GetData return current stored data
func GetData(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	db := storage.GetDB()
	var data []byte
	db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("data"))
		data = b.Get([]byte("data"))
		return nil
	})

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(data))

	next(w, r)
}

// SetData sets current data into bolt
func SetData(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	db := storage.GetDB()
	err := db.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("data"))

		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
			return err
		}

		b.Put([]byte("data"), []byte(body))
		return nil
	})

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
	next(w, r)
}
