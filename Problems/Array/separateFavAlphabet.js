const data = ['Akhlaque', 'Ashfaque', 'Ayan', 'Ayan', 'Bob', 'Charle', 'Dhruv', 'Dhruv', 'Esha', 'Esha', 'Faisal', 'Faisal', 'Gaurav', 'Gaurav', 'Himanshu', 'Himanshu', 'Ishaan', 'Ishaan', 'Jatin', 'Jatin', 'Kshitij', 'Kshitij', 'Lakshya', 'Lakshya', 'Manan', 'Manan', 'Naman', 'Naman', 'Ojas', 'Ojas', 'Pranjal', 'Pranjal', 'Qamar', 'Qamar', 'Rahul', 'Rahul', 'Sachin', 'Sachin', 'Tushar', 'Tushar', 'Umesh', 'Umesh', 'Vikas', 'Vikas', 'Wajid', 'Wajid', 'Xander', 'Xander', 'Yash', 'Yash', 'Zaid', 'Zaid'];

const favAlphabet = 'A';

function separateFavAlphabet(data, favAlphabet) {
    const result = {
        fav: [],
        others: []
    }
    for (let word of data) {
        if (typeof word === 'string' && word.startsWith(favAlphabet)) {
            result.fav.push(word);
        } else {
            result.others.push(word);
        }
    }
    return result;
}
console.log(separateFavAlphabet(data, favAlphabet));
