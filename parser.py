import requests
from bs4 import BeautifulSoup
import random

def get_quotes():
    # 1. Заходим на сайт с цитатами
    url = "http://quotes.toscrape.com/"
    print(f"Загружаем страницу: {url} ...")
    
    # 2. Скачиваем HTML-код страницы
    response = requests.get(url)
    
    # 3. Передаем код парсеру BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 4. Ищем все блоки с цитатами
    quotes = soup.find_all('div', class_='quote')
    
    # 5. Вытаскиваем текст и автора из каждого блока
    parsed_quotes = []
    for quote in quotes:
        text = quote.find('span', class_='text').text
        author = quote.find('small', class_='author').text
        parsed_quotes.append(f"«{text}» — {author}")
    
    return parsed_quotes

def save_to_file(quotes):
    # Сохраняем в файл
    with open("quotes.txt", "w", encoding="utf-8") as f:
        for q in quotes:
            f.write(q + "\n\n")
    print("✅ Цитаты успешно сохранены в файл quotes.txt!")

# --- Запуск ---
if __name__ == "__main__":
    all_quotes = get_quotes()
    
    if all_quotes:
        # Берем 5 случайных цитат
        random_quotes = random.sample(all_quotes, 5)
        
        print("\nВот 5 случайных цитат:")
        for q in random_quotes:
            print(f" - {q}")
            
        save_to_file(random_quotes)
    else:
        print("❌ Не удалось найти цитаты. Проверьте соединение с интернетом.")