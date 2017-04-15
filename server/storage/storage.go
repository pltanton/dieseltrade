package storage

import (
	"log"

	"github.com/boltdb/bolt"
)

var dbInstance *bolt.DB

// Init opens connection to database and initializes db instance
func Init() {
	var err error
	dbInstance, err = bolt.Open("tmp/my.db", 0600, nil)
	if err != nil {
		log.Fatal(err)
	}

	setSchema()
}

// Close closes database instance
func Close() {
	dbInstance.Close()
}

// GetDB returns bolt db instance
func GetDB() *bolt.DB {
	return dbInstance
}

func setSchema() {
	dbInstance.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists([]byte("data"))
		if err != nil {
			log.Fatal(err)
			return err
		}
		return nil
	})
}
