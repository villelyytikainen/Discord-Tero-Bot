async function getPrice(product, count){
    const puppeteer = require('puppeteer');
    return new Promise((resolve, reject) =>{
        (async () =>{
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            try {
                if(product.includes('"')){
                    product = product.trim();
                    const productArr = product.split(" ");
                    console.log(product);
                    // for(let i=0; i<productArr.length; i++){
                    //     console.log([i], productArr[i])
                    // }

                    // product = productArr.join(" ");

                    // console.log(product);
                }

                await page.goto('https://jimms.fi');
                await page.waitForSelector('#qpsv2-topinput');
                await page.$eval('#qpsv2-topinput', (el, value)=> el.value = value, product);
                await page.$eval('.form-inline', form => form.submit());
                await page.waitForSelector('.p_col_price');

                const prices = await page.$$('.p_price');
                const names = await page.$$('.p_name');
                let priceInfo = [];

                for (let i = 0; i < count; i++) {
                    const price = prices[i];
                    const name = names[i];

                    const priceAmount = await price.evaluate(price => price.innerText, price);
                    const nameText = await name.evaluate(name => name.innerText, name);
                    const priceObj = {
                        name: nameText,
                        price: priceAmount
                    }

                    priceInfo.push(priceObj);
                }
                console.table(priceInfo);
                resolve(priceInfo);

            } catch (err) {
                reject(err)
            }

            // browser.close();
        })()
    })
}

module.exports = getPrice;