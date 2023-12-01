package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
)

func getInputFile() (*os.File, *bufio.Scanner, error) {
	file, err := os.Open("./input.txt")
	if err != nil {
		return nil, nil, err
	}

	scanner := bufio.NewScanner(file)
	return file, scanner, nil
}

func main() {
	file, scanner, err := getInputFile()
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// Now you can use the scanner to read from the file
	sum := 0
	for scanner.Scan() {
		line := scanner.Text()
		re := regexp.MustCompile(`\d[1]*`)
		numbers := re.FindAllString(line, -1)
		fmt.Println(numbers)
		if len(numbers) == 1 {
			num, err := strconv.Atoi(numbers[0])
			if err != nil {
				log.Fatal(err)
			}
			fmt.Println("=1", num)
			sum += num
		} else if len(numbers) > 1 {
			numberStr := fmt.Sprintf("%s%s", numbers[0], numbers[len(numbers)-1])
			num, err := strconv.Atoi(numberStr)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Println(">1", num)
			sum += num
		}
	}
	fmt.Println(sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}
