package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func getInputFile(number int64) (*os.File, *bufio.Scanner, error) {
	file, err := os.Open(fmt.Sprintf("./input%d.txt", number))
	if err != nil {
		return nil, nil, err
	}

	scanner := bufio.NewScanner(file)
	return file, scanner, nil
}

func exceedsBoundary(color string, line string, boundary int) bool {
	re := regexp.MustCompile(fmt.Sprintf(`(\d+) %s`, color))
	matches := re.FindAllString(line, -1)
	for i, element := range matches {
		matches[i] = strings.ReplaceAll(element, fmt.Sprintf(` %s`, color), "")
	}
	fmt.Println(color, matches)
	for _, element := range matches {
		num, err := strconv.Atoi(element)
		if err != nil {
			fmt.Println(err)
		}
		if num > boundary {
			return true
		}
	}

	return false
}

func main() {
	file, scanner, err := getInputFile(1)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	sum := 0
	for scanner.Scan() {
		line := scanner.Text()
		fmt.Println(line)

		re := regexp.MustCompile(`(\d+)`)
		matches := re.FindAllString(line, -1)
		id, err := strconv.Atoi(matches[0])
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println("id", id)

		if exceedsBoundary("blue", line, 14) ||
			exceedsBoundary("green", line, 13) ||
			exceedsBoundary("red", line, 12) {
			continue
		}

		sum += id
	}
	fmt.Println(sum)
}
