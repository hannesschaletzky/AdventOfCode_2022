package main

import (
	"2023/utils"
	"fmt"
	"log"
)

func main() {
	file, scanner, err := utils.GetInputFile()
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	for scanner.Scan() {
		line := scanner.Text()
		fmt.Println(line)
	}
}
