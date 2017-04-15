package handlers

import (
	"net/http"
)

// GetData return current stored data
func GetData(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	sampleData := `
{
	"sections": [
	{
		"title": "First",
		"color": {"r": 1, "g": 223, "b": 64, "a": 0.54},
		"usecolor": true,
		"bgimage": "/images/bg1.svg",
		"anchor": "first",
		"slide": {
			"type": "simple text",
			"content": {
				"text": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
			}
		}
	}, {
		"title": "Seccond",
		"color": {"r": 101, "g": 223, "b": 64, "a": 0.42},
		"usecolor": false,
		"bgimage": "/images/bg2.svg",
		"anchor": "seccond",
		"slide": {
			"type": "simple text",
			"content": {
				"text": "Third"
			}
		}
	}, {
		"title": "Third",
		"color": {"r": 41, "g": 3, "b": 4, "a": 0.42},
		"usecolor": true,
		"bgimage": "/images/bg3.svg",
		"anchor": "third",
		"slide": {
			"type": "simple text",
			"content": {
				"text": "Third"
			}
		}
	}
	]
}
`
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(sampleData))

	next(w, r)
}
