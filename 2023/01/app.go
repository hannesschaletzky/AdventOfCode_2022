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

func returnNumberForString(number string) string {
	switch number {
	case "one":
		return "1"
	case "two":
		return "2"
	case "three":
		return "3"
	case "four":
		return "4"
	case "five":
		return "5"
	case "six":
		return "6"
	case "seven":
		return "7"
	case "eight":
		return "8"
	case "nine":
		return "9"
	default:
		return ""
	}
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

		i := 1
		for i <= len(line) {
			fmt.Println(line[0:i])
			re := regexp.MustCompile(`(?:one|two|three|four|five|six|seven|eight|nine)`)
			matches := re.FindAllString(line[0:i], -1)
			fmt.Println(matches)
			if len(matches) == 1 {
				line = strings.ReplaceAll(line, matches[0], returnNumberForString(matches[0]))
				break
			}
			i++
		}

		fmt.Println(line)
		i = len(line)
		for i >= 0 {
			fmt.Println(line[i:])
			re := regexp.MustCompile(`(?:one|two|three|four|five|six|seven|eight|nine)`)
			matches := re.FindAllString(line[i:], -1)
			fmt.Println(matches)
			if len(matches) == 1 {
				line = line[0:i] + strings.ReplaceAll(line[i:], matches[0], returnNumberForString(matches[0]))
				break
			}
			i--
		}

		re := regexp.MustCompile(`\d`)
		numbers := re.FindAllString(line, -1)
		fmt.Println(line)
		fmt.Println(numbers)
		numberStr := ""
		if len(numbers) == 0 {
			numberStr = "0"
		} else if len(numbers) == 1 {
			numberStr = fmt.Sprintf("%s%s", numbers[0], numbers[0])
		} else if len(numbers) > 1 {
			numberStr = fmt.Sprintf("%s%s", numbers[0], numbers[len(numbers)-1])
		}
		num, err := strconv.Atoi(numberStr)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("", num)
		sum += num
	}
	fmt.Println(sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}
