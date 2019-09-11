from scrapy import cmdline

cmdline.execute("scrapy crawl lj -o lj.json".split())