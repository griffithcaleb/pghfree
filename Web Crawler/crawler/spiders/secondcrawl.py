import scrapy


class PghCulturalTrustSpider(scrapy.Spider):
    name = "secondCrawler"

    def start_requests(self):
        urls = [
            'https://trustarts.org/calendar?utf8=%E2%9C%93&utf8=%E2%9C%93&genre=Free&organization_id=1&start_date=&end_date=&filter%5Bmin%5D=2018-07-25T16%3A24%3A56-05%3A00&filter%5Bmax%5D=2020-01-25+17%3A24%3A56+-0500&filter%5Bcurrent_page%5D=production&gclid=CjwKCAiAyrXiBRAjEiwATI95mfekGaEMUJvh0xdZhxSD1ecXIhAyII117W0qq9182Xq09sA1vf6gxxoCSQQQAvD_BwE'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
    	for quote in response.css('.events-group'):
            yield {
                'title': quote.css('.title a::text').extract_first(),
				'time': quote.css('.time-wrapper .range::text').extract_first(),
                'location': quote.css('.venue::text').extract_first(),
                'findOutMore': quote.css('.title a::attr(href)').extract(),
                'eventPhoto': quote.css('.lead-image').xpath('@src').extract(),
              }
