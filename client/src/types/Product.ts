export type Product = {
	ID?: number,
	Name: string,
	Price: number,
	Category:  string,
	Color:    string,
	Size:     string
	Images?:   string[],
	Qty?: number
}