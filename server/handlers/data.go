package handlers

import (
	"net/http"
)

// GetData return current stored data
func GetData(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	sampleData := `{
"sections": [
  {
    "title": "First",
    "color": "#abc",
    "anchor": "first-one",
    "slides": [{
	  "type": "simple text",
	  "content": { "text": "first slide one" },
    },
    {
	  "type": "simple text",
	  "content": { "text": "first slide two" },
	  "active": true,
    }],
  },
  {
    "title": "Seccond",
    "color": "#ccc",
    "anchor": "seccond",
    "slides": [{
      "type": "simple text",
      "content": { "text": "testik2" },
    }],
  }
]}`
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(sampleData))

	next(w, r)
}
