import scrapy


class EventbriteSpider(scrapy.Spider):
    name = "firstCrawler"

    def start_requests(self):
        urls = [
            'https://www.eventbrite.com/d/pa--pittsburgh/free--music--events/free/?page=1'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
    	for data in response.css('.search-event-card-wrapper'):
            yield {
                'title': data.css('.card-text--truncated__three::text').extract_first(),
				'time': data.css('.eds-l-mar-top-1::text').extract_first(),
                'location': data.css('.card-text--truncated__one::text').extract(),
                'findOutMore': data.css('.eds-media-card-content__primary-content a::attr(href)').extract(),
                'eventPhoto': data.css('.eds-media-card-content__image').xpath('@src').extract(),
              }
