function parseExpenseData(expenseData) {
    const lines = expenseData.split('\n').filter(line => line.trim() !== '');
    const result = [];

    // Regex: Capture FIRST number as amount, rest as description
    const regex = /^\s*(\d+)\s+(.*?)\s*$/;

    for (const line of lines) {
        const match = line.match(regex);

        if (match) {
            const amount = parseInt(match[1], 10);
            const description = match[2].trim();
            result.push({ description, amount });
        } else {
            console.warn("No match found for line:", line);
        }
    }

    return result;
}

// Sample usage:
const input = `March kharcha 2025

11151 Imran emi 
12800 Ehsan emi
20000 Room Booking bangalore 
20000 Dude+Atts Emi
37000 Car emi 
960 beaf 4kg+magaj
930 biryani Rice 10kg
15000 Ammi ko deke aye Ghar kharch k liye
2000 Dude + Atts electric 27feb
5300 ammi one month dawa
110 Chicken 
200 fal anar tarbuj Kela angor
5600 Ramzan items pinkhajoor,pista,all vegetables, all fruits, alu,etc
2500 motu
2000 mukhtar Chanda
500 Mota hafiji Chanda
560 mutton 
440 chicken 
3700 EHSAN mobile 
2000 Khushi 
350 Khalil 
2100 injection,Dawa etc
2500 Kuldeep 
930 Kapoor milk
470 Sudha dudh, Dahi etc
1000 Madam Chanda 
500 Jameul uloom chanda
499 Ehsan data Reacharge 
250 Rahul ice cream 
1100 Gari wash,paneer, chicken ashab bhai ko etc
1000 Nani kodarkatta
500 burhiya 
20000 Ehsan mobile 
8990 ammi,bhabhi sleeper
1000 lungi batai
349 Reacharge Mota
6897 pinkhajoor, Chana,chini, milk,Dahi,kaju,all fal,mutton,chicken, takiya khol ,vegetables nembu etc
180 Piyaz 
223 dawa
3000 siwapatti me bantaya Khalil,hashim wagairah ko
800 bike petrol
1989 Ehsan jeans t-shirt
2000 atts,Dude Reacharge 
2600 ammi medicine
3200 eid shopping urad daal kaju,pista,all fruits, vegetables etc.`;

const output = parseExpenseData(input);
console.log(output.length);

console.log(JSON.stringify(output, null, 2));