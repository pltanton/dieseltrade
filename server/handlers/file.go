package handlers

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
)

const filesDir = "./files"

// SaveFile saves current file
func SaveFile(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	mr, _ := r.MultipartReader()
	for {
		p, err := mr.NextPart()
		if err == io.EOF {
			break
		}
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		d, err := ioutil.ReadAll(p)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		err = ioutil.WriteFile(filepath.Join(filesDir, p.FileName()), d, 0644)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
	}

	w.WriteHeader(http.StatusOK)
	next(w, r)
}

// DeleteFile deletes file from disk
func DeleteFile(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	vars := mux.Vars(r)
	err := os.Remove(filepath.Join(filesDir, vars["filename"]))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
	next(w, r)
}

// FilesIndex responds with list of files in `files` directory
func FilesIndex(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	files, err := ioutil.ReadDir(filesDir)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	filesIndex := make([]string, len(files))
	for i, file := range files {
		filesIndex[i] = file.Name()
	}

	marshalledFilesIndex, err := json.Marshal(filesIndex)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(marshalledFilesIndex)

	next(w, r)
}
