/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { BaseStemmer } = require('@lumen-labs-dev/core');

class StemmerEl extends BaseStemmer {
  constructor(container) {
    super(container);
    this.name = 'stemmer-el';
  }

  isGreek(word) {
    return /^[αβγδεζηθικλμνξοπρσστυφχψω]+$/.test(word);
  }

  endsInVowel(word) {
    return /[αεηιουω]$/.test(word);
  }

  endsInVowelWithoutY(word) {
    return /[αεηιοω]$/.test(word);
  }

  step1(word) {
    const match = StemmerEl.step1WordsReg.exec(word);
    return match ? `${match[1]}${StemmerEl.step1Words[match[2]]}` : word;
  }

  step2a(word) {
    const match = /^(.+?)(αδεσ|αδων)$/.exec(word);
    if (match) {
      let result = match[1];
      if (
        !/(οκ|μαμ|μαν|μπαμπ|πατερ|γιαγι|νταντ|κυρ|θει|πεθερ|μουσαμ|καπλαμ|παρ|ψαρ|τζουρ|ταμπουρ|γαλατ|φαφλατ)$/.test(
          result
        )
      ) {
        result += 'αδ';
      }
      return result;
    }
    return word;
  }

  step2b(word) {
    const match = /^(.+?)(εδεσ|εδων)$/.exec(word);
    if (match) {
      let result = match[1];
      if (/(οπ|ιπ|εμπ|υπ|γηπ|δαπ|κρασπ|μιλ)$/.test(result)) {
        result += 'εδ';
      }
      return result;
    }
    return word;
  }

  step2c(word) {
    const match = /^(.+?)(ουδεσ|ουδων)$/.exec(word);
    if (match) {
      let result = match[1];
      if (
        /(αρκ|καλιακ|πεταλ|λιχ|πλεξ|σκ|σ|φλ|φρ|βελ|λουλ|χν|σπ|τραγ|φε)$/.test(
          result
        )
      ) {
        result += 'ουδ';
      }
    }
    return word;
  }

  step2d(word) {
    const match = /^(.+?)(εωσ|εων|εασ|εα)$/.exec(word);
    if (match) {
      let result = match[1];
      if (/^(θ|δ|ελ|γαλ|ν|π|ιδ|παρ|στερ|ορφ|ανδρ|αντρ)$/.test(result)) {
        result += 'ε';
      }
      return result;
    }
    return word;
  }

  step3a(word) {
    const match = /^(.+?)(ειο|ειοσ|ειοι|εια|ειασ|ειεσ|ειου|ειουσ|ειων)$/.exec(
      word
    );
    return match && match[1].length > 4 ? match[1] : word;
  }

  step3b(word) {
    const match = /^(.+?)(ιουσ|ιασ|ιεσ|ιοσ|ιου|ιοι|ιων|ιον|ια|ιο)$/.exec(word);
    if (match) {
      let result = match[1];
      if (
        result.length < 2 ||
        this.endsInVowel(result) ||
        /^(αγ|αγγελ|αγρ|αερ|αθλ|ακουσ|αξ|ασ|β|βιβλ|βυτ|γ|γιαγ|γων|δ|δαν|δηλ|δημ|δοκιμ|ελ|ζαχαρ|ηλ|ηπ|ιδ|ισκ|ιστ|ιον|ιων|κιμωλ|κολον|κορ|κτηρ|κυρ|λαγ|λογ|μαγ|μπαν|μπρ|ναυτ|νοτ|οπαλ|οξ|ορ|οσ|παναγ|πατρ|πηλ|πην|πλαισ|ποντ|ραδ|ροδ|σκ|σκορπ|σουν|σπαν|σταδ|συρ|τηλ|τιμ|τοκ|τοπ|τροχ|φιλ|φωτ|χ|χιλ|χρωμ|χωρ)$/.test(
          result
        )
      ) {
        result += 'ι';
      }
      if (/^(παλ)$/.test(match[1])) {
        result += 'αι';
      }
      return result;
    }
    return word;
  }

  step4(word) {
    const match =
      /^(.+?)(ικοσ|ικον|ικεισ|ικοι|ικεσ|ικουσ|ικη|ικησ|ικο|ικα|ικου|ικων|ικωσ)$/.exec(
        word
      );
    if (match) {
      let result = match[1];
      if (
        this.endsInVowel(result) ||
        /(φοιν)$/.test(result) ||
        /^(αδ|αλ|αμαν|αμερ|αμμοχαλ|ανηθ|αντιδ|απλ|αττ|αφρ|βασ|βρωμ|γεν|γερ|δ|δικαν|δυτ|ειδ|ενδ|εξωδ|ηθ|θετ|καλλιν|καλπ|καταδ|κουζιν|κρ|κωδ|λογ|μ|μερ|μοναδ|μουλ|μουσ|μπαγιατ|μπαν|μπολ|μποσ|μυστ|ν|νιτ|ξικ|οπτ|παν|πετσ|πικαντ|πιτσ|πλαστ|πλιατσ|ποντ|ποστελν|πρωτοδ|σερτ|σημαντ|στατ|συναδ|συνομηλ|τελ|τεχν|τροπ|τσαμ|υποδ|φ|φιλον|φυλοδ|φυσ|χασ)$/.test(
          result
        )
      ) {
        result += 'ικ';
      }
    }
    return word;
  }

  step5a(word) {
    let result = word;
    if (result === 'αγαμε') {
      result = 'αγαμ';
    }
    let match = /^(.+?)(αγαμε|ησαμε|ουσαμε|ηκαμε|ηθηκαμε)$/.exec(result);
    if (match) {
      [, result] = match;
    }
    match = /^(.+?)(αμε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (
        /^(αναπ|αποθ|αποκ|αποστ|βουβ|ξεθ|ουλ|πεθ|πικρ|ποτ|σιχ|χ)$/.test(result)
      ) {
        result += 'αμ';
      }
    }
    return result;
  }

  step5b(word) {
    let result = word;
    let match =
      /^(.+?)(αγανε|ησανε|ουσανε|ιοντανε|ιοτανε|ιουντανε|οντανε|οτανε|ουντανε|ηκανε|ηθηκανε)$/.exec(
        result
      );
    if (match) {
      [, result] = match;
      if (/^(τρ|τς)$/.test(result)) {
        result += 'αγαν';
      }
    }
    match = /^(.+?)(ανε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (
        this.endsInVowelWithoutY(result) ||
        /^(βετερ|βουλκ|βραχμ|γ|δραδουμ|θ|καλπουζ|καστελ|κορμορ|λαοπλ|μωαμεθ|μ|μουσουλμαν|ουλ|π|πελεκ|πλ|πολισ|πορτολ|σαρακατσ|σουλτ|τσαρλατ|ορφ|τσιγγ|τσοπ|φωτοστεφ|χ|ψυχοπλ|αγ|ορφ|γαλ|γερ|δεκ|διπλ|αμερικαν|ουρ|πιθ|πουριτ|σ|ζωντ|ικ|καστ|κοπ|λιχ|λουθηρ|μαιντ|μελ|σιγ|σπ|στεγ|τραγ|τσαγ|φ|ερ|αδαπ|αθιγγ|αμηχ|ανικ|ανοργ|απηγ|απιθ|ατσιγγ|βασ|βασκ|βαθυγαλ|βιομηχ|βραχυκ|διατ|διαφ|ενοργ|θυσ|καπνοβιομηχ|καταγαλ|κλιβ|κοιλαρφ|λιβ|μεγλοβιομηχ|μικροβιομηχ|νταβ|ξηροκλιβ|ολιγοδαμ|ολογαλ|πενταρφ|περηφ|περιτρ|πλατ|πολυδαπ|πολυμηχ|στεφ|ταβ|τετ|υπερηφ|υποκοπ|χαμηλοδαπ|ψηλοταβ)$/.test(
          result
        )
      ) {
        result += 'αν';
      }
    }
    return result;
  }

  step5c(word) {
    let result = word;
    let match = /^(.+?)(ησετε)$/.exec(result);
    if (match) {
      [, result] = match;
    }
    match = /^(.+?)(ετε)$/.exec(word);
    if (match) {
      [, result] = match;
      if (
        this.endsInVowelWithoutY(result) ||
        /(οδ|αιρ|φορ|ταθ|διαθ|σχ|ενδ|ευρ|τιθ|υπερθ|ραθ|ενθ|ροθ|σθ|πυρ|αιν|συνδ|συν|συνθ|χωρ|πον|βρ|καθ|ευθ|εκθ|νετ|ρον|αρκ|βαρ|βολ|ωφελ)$/.test(
          result
        ) ||
        /^(αβαρ|βεν|εναρ|αβρ|αδ|αθ|αν|απλ|βαρον|ντρ|σκ|κοπ|μπορ|νιφ|παγ|παρακαλ|σερπ|σκελ|συρφ|τοκ|υ|δ|εμ|θαρρ|θ)$/.test(
          result
        )
      ) {
        result += 'ετ';
      }
    }
    return result;
  }

  step5d(word) {
    let result = word;
    const match = /^(.+?)(οντασ|ωντασ)$/.exec(result);
    if (match) {
      [, result] = match;
      if (/^αρχ$/.test(result)) {
        result += 'οντ';
      }
      if (/κρε$/.test(match[1])) {
        result += 'ωντ';
      }
    }
    return result;
  }

  step5e(word) {
    let result = word;
    const match = /^(.+?)(ομαστε|ιομαστε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (/^ον$/.test(result)) {
        result += 'ομαστ';
      }
    }
    return result;
  }

  step5f(word) {
    let result = word;
    let match = /^(.+?)(ιεστε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (/^(π|απ|συμπ|ασυμπ|ακαταπ|αμεταμφ)$/.test(result)) {
        result += 'ιεστ';
      }
    }
    match = /^(.+?)(εστε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (/^(αλ|αρ|εκτελ|ζ|μ|ξ|παρακαλ|αρ|προ|νισ)$/.test(result)) {
        result += 'εστ';
      }
    }
    return result;
  }

  step5g(word) {
    let result = word;
    let match = /^(.+?)(ηθηκα|ηθηκεσ|ηθηκε)$/.exec(result);
    if (match) {
      [, result] = match;
    }
    match = /^(.+?)(ηκα|ηκεσ|ηκε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (
        /(σκωλ|σκουλ|ναρθ|σφ|οθ|πιθ)$/.test(match[1]) ||
        /^(διαθ|θ|παρακαταθ|προσθ|συνθ)$/.test(match[1])
      ) {
        result += 'ηκ';
      }
    }
    return result;
  }

  step5h(word) {
    let result = word;
    const match = /^(.+?)(ουσα|ουσεσ|ουσε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (
        this.endsInVowel(result) ||
        /^(φαρμακ|χαδ|αγκ|αναρρ|βρομ|εκλιπ|λαμπιδ|λεχ|μ|πατ|ρ|λ|μεδ|μεσαζ|υποτειν|αμ|αιθ|ανηκ|δεσποζ|ενδιαφερ)$/.test(
          result
        ) ||
        /(ποδαρ|βλεπ|πανταχ|φρυδ|μαντιλ|μαλλ|κυματ|λαχ|ληγ|φαγ|ομ|πρωτ)$/.test(
          result
        )
      ) {
        result += 'ουσ';
      }
    }
    return result;
  }

  step5i(word) {
    let result = word;
    const match = /^(.+?)(αγα|αγεσ|αγε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (
        /^(αβαστ|πολυφ|αδηφ|παμφ|ρ|ασπ|αφ|αμαλ|αμαλλι|ανυστ|απερ|ασπαρ|αχαρ|δερβεν|δροσοπ|ξεφ|νεοπ|νομοτ|ολοπ|ομοτ|προστ|προσωποπ|συμπ|συντ|τ|υποτ|χαρ|αειπ|αιμοστ|ανυπ|αποτ|αρτιπ|διατ|εν|επιτ|κροκαλοπ|σιδηροπ|λ|ναυ|ουλαμ|ουρ|π|τρ|μ)$/.test(
          result
        ) ||
        (/(οφ|πελ|χορτ|λλ|σφ|ρπ|φρ|πρ|λοχ|σμην)$/.test(result) &&
          !/^(ψοφ|ναυλοχ)$/.test(result)) ||
        /(κολλ)$/.test(result)
      ) {
        result += 'αγ';
      }
    }
    return result;
  }

  step5j(word) {
    let result = word;
    const match = /^(.+?)(ησε|ησου|ησα)$/.exec(result);
    if (match) {
      [, result] = match;
      if (/^(ν|χερσον|δωδεκαν|ερημον|μεγαλον|επταν|ι)$/.test(result)) {
        result += 'ησ';
      }
    }
    return result;
  }

  step5k(word) {
    let result = word;
    const match = /^(.+?)(ηστε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (
        /^(ασβ|σβ|αχρ|χρ|απλ|αειμν|δυσχρ|ευχρ|κοινοχρ|παλιμψ)$/.test(result)
      ) {
        result += 'ηστ';
      }
    }
    return result;
  }

  step5l(word) {
    let result = word;
    const match = /^(.+?)(ουνε|ησουνε|ηθουνε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (/^(ν|ρ|σπι|στραβομουτσ|κακομουτσ|εξων)$/.test(result)) {
        result += 'ουν';
      }
    }
    return result;
  }

  step5m(word) {
    let result = word;
    const match = /^(.+?)(ουμε|ησουμε|ηθουμε)$/.exec(result);
    if (match) {
      [, result] = match;
      if (/^(παρασουσ|φ|χ|ωριοπλ|αζ|αλλοσουσ|ασουσ)$/.test(result)) {
        result += 'ουμ';
      }
    }
    return result;
  }

  step6a(word) {
    let result = word;
    const match =
      /^(.+?)(ματοι|ματουσ|ματο|ματα|ματωσ|ματων|ματοσ|ματεσ|ματη|ματησ|ματου)$/.exec(
        result
      );
    if (match) {
      result = `${match[1]}μ`;
      if (/^(γραμ)$/.test(result)) {
        result += 'α';
      } else if (/^(γε|στα)$/.test(result)) {
        result += 'ατ';
      }
    }
    return result;
  }

  step6b(word, srcWord) {
    let result = word;
    let match = /^(.+?)(ουα)$/.exec(result);
    if (match) {
      result = `${match[1]}ου`;
    }
    if (result.length === srcWord.length) {
      match =
        /^(.+?)(α|αγατε|αγαν|αει|αμαι|αν|ασ|ασαι|αται|αω|ε|ει|εισ|ειτε|εσαι|εσ|εται|ι|ιεμαι|ιεμαστε|ιεται|ιεσαι|ιεσαστε|ιομασταν|ιομουν|ιομουνα|ιονταν|ιοντουσαν|ιοσασταν|ιοσαστε|ιοσουν|ιοσουνα|ιοταν|ιουμα|ιουμαστε|ιουνται|ιουνταν|η|ηδεσ|ηδων|ηθει|ηθεισ|ηθειτε|ηθηκατε|ηθηκαν|ηθουν|ηθω|ηκατε|ηκαν|ησ|ησαν|ησατε|ησει|ησεσ|ησουν|ησω|ο|οι|ομαι|ομασταν|ομουν|ομουνα|ονται|ονταν|οντουσαν|οσ|οσασταν|οσαστε|οσουν|οσουνα|οταν|ου|ουμαι|ουμαστε|ουν|ουνται|ουνταν|ουσ|ουσαν|ουσατε|υ||υα|υσ|ω|ων|οισ)$/.exec(
          result
        );
      if (match) {
        [, result] = match;
      }
    }
    return result;
  }

  step7(word) {
    let result = word;
    const match = /^(.+?)(εστερ|εστατ|οτερ|οτατ|υτερ|υτατ|ωτερ|ωτατ)$/.exec(
      result
    );
    if (match) {
      if (!/^(εξ|εσ|αν|κατ|κ|πρ)$/.test(result)) {
        [, result] = match;
      }
      if (/^(κα|μ|ελε|λε|δε)$/.test(result)) {
        result += 'υτ';
      }
    }
    return result;
  }

  innerStem() {
    const srcWord = this.getCurrent();
    let word = srcWord;
    word = word.replace('ς', 'σ');
    if (
      word.length < 3 ||
      !this.isGreek(word) ||
      StemmerEl.protectedWords[word]
    ) {
      this.setCurrent(word);
      return;
    }
    word = this.step1(word);
    word = this.step2a(word);
    word = this.step2b(word);
    word = this.step2c(word);
    word = this.step2d(word);
    word = this.step3a(word);
    word = this.step3b(word);
    word = this.step4(word);
    word = this.step5a(word);
    word = this.step5b(word);
    word = this.step5c(word);
    word = this.step5d(word);
    word = this.step5e(word);
    word = this.step5f(word);
    word = this.step5g(word);
    word = this.step5h(word);
    word = this.step5i(word);
    word = this.step5j(word);
    word = this.step5k(word);
    word = this.step5l(word);
    word = this.step5m(word);
    word = this.step6a(word);
    word = this.step6b(word, srcWord);
    word = this.step7(word);
    this.setCurrent(word);
  }
}

StemmerEl.step1Words = {
  φαγια: 'φα',
  φαγιου: 'φα',
  φαγιων: 'φα',
  σκαγια: 'σκα',
  σκαγιου: 'σκα',
  σκαγιων: 'σκα',
  σογιου: 'σο',
  σογια: 'σο',
  σογιων: 'σο',
  τατογια: 'τατο',
  τατογιου: 'τατο',
  τατογιων: 'τατο',
  κρεασ: 'κρε',
  κρεατοσ: 'κρε',
  κρεατα: 'κρε',
  κρεατων: 'κρε',
  περασ: 'περ',
  περατοσ: 'περ',
  περατα: 'περ',
  περατων: 'περ',
  τερασ: 'τερ',
  τερατοσ: 'τερ',
  τερατα: 'τερ',
  τερατων: 'τερ',
  φωσ: 'φω',
  φωτοσ: 'φω',
  φωτα: 'φω',
  φωτων: 'φω',
  καθεστωσ: 'καθεστ',
  καθεστωτοσ: 'καθεστ',
  καθεστωτα: 'καθεστ',
  καθεστωτων: 'καθεστ',
  γεγονοσ: 'γεγον',
  γεγονοτοσ: 'γεγον',
  γεγονοτα: 'γεγον',
  γεγονοτων: 'γεγον',
  ευα: 'ευ',
};

StemmerEl.step1WordsReg = new RegExp(
  `(.*)(${Object.keys(StemmerEl.step1Words).join('|')})$`
);

StemmerEl.protectedWords = {
  ακριβωσ: 1,
  αλα: 1,
  αλλα: 1,
  αλλιωσ: 1,
  αλλοτε: 1,
  αμα: 1,
  ανω: 1,
  ανα: 1,
  αναμεσα: 1,
  αναμεταξυ: 1,
  ανευ: 1,
  αντι: 1,
  αντιπερα: 1,
  αντιο: 1,
  αξαφνα: 1,
  απο: 1,
  αποψε: 1,
  αρα: 1,
  αραγε: 1,
  αυριο: 1,
  αφοι: 1,
  αφου: 1,
  αφοτου: 1,
  βρε: 1,
  γεια: 1,
  για: 1,
  γιατι: 1,
  γραμμα: 1,
  δεη: 1,
  δεν: 1,
  δηλαδη: 1,
  διχωσ: 1,
  δυο: 1,
  εαν: 1,
  εγω: 1,
  εδω: 1,
  εδα: 1,
  ειθε: 1,
  ειμαι: 1,
  ειμαστε: 1,
  εισαι: 1,
  εισαστε: 1,
  ειναι: 1,
  ειστε: 1,
  ειτε: 1,
  εκει: 1,
  εκο: 1,
  ελα: 1,
  εμασ: 1,
  εμεισ: 1,
  εντελωσ: 1,
  εντοσ: 1,
  εντωμεταξυ: 1,
  ενω: 1,
  εξι: 1,
  εξισου: 1,
  εξησ: 1,
  εξω: 1,
  εοκ: 1,
  επανω: 1,
  επειδη: 1,
  επειτα: 1,
  επι: 1,
  επισησ: 1,
  επομενωσ: 1,
  επτα: 1,
  εσασ: 1,
  εσεισ: 1,
  εστω: 1,
  εσυ: 1,
  εσω: 1,
  ετσι: 1,
  ευγε: 1,
  εφε: 1,
  εφεξησ: 1,
  εχτεσ: 1,
  εωσ: 1,
  ηδη: 1,
  ημι: 1,
  ηπα: 1,
  ητοι: 1,
  θεσ: 1,
  ιδιωσ: 1,
  ιδη: 1,
  ικα: 1,
  ισωσ: 1,
  καθε: 1,
  καθετι: 1,
  καθολου: 1,
  καθωσ: 1,
  και: 1,
  καν: 1,
  καποτε: 1,
  καπου: 1,
  κατα: 1,
  κατι: 1,
  κατοπιν: 1,
  κατω: 1,
  κει: 1,
  κιχ: 1,
  κκε: 1,
  κολαν: 1,
  κυριωσ: 1,
  κωσ: 1,
  μακαρι: 1,
  μαλιστα: 1,
  μαλλον: 1,
  μαι: 1,
  μαο: 1,
  μαουσ: 1,
  μασ: 1,
  μεθαυριο: 1,
  μεσ: 1,
  μεσα: 1,
  μετα: 1,
  μεταξυ: 1,
  μεχρι: 1,
  μηδε: 1,
  μην: 1,
  μηπωσ: 1,
  μητε: 1,
  μια: 1,
  μιασ: 1,
  μισ: 1,
  μμε: 1,
  μολονοτι: 1,
  μου: 1,
  μπα: 1,
  μπασ: 1,
  μπουφαν: 1,
  μπροσ: 1,
  ναι: 1,
  νεσ: 1,
  ντα: 1,
  ντε: 1,
  ξανα: 1,
  οηε: 1,
  οκτω: 1,
  ομωσ: 1,
  ονε: 1,
  οπα: 1,
  οπου: 1,
  οπωσ: 1,
  οσο: 1,
  οταν: 1,
  οτε: 1,
  οτι: 1,
  ουτε: 1,
  οχι: 1,
  παλι: 1,
  παν: 1,
  πανο: 1,
  παντοτε: 1,
  παντου: 1,
  παντωσ: 1,
  πανω: 1,
  παρα: 1,
  περα: 1,
  περι: 1,
  περιπου: 1,
  πια: 1,
  πιο: 1,
  πισω: 1,
  πλαι: 1,
  πλεον: 1,
  πλην: 1,
  ποτε: 1,
  που: 1,
  προ: 1,
  προσ: 1,
  προχτεσ: 1,
  προχθεσ: 1,
  ροδι: 1,
  πωσ: 1,
  σαι: 1,
  σασ: 1,
  σαν: 1,
  σεισ: 1,
  σια: 1,
  σκι: 1,
  σοι: 1,
  σου: 1,
  σρι: 1,
  συν: 1,
  συναμα: 1,
  σχεδον: 1,
  ταδε: 1,
  ταξι: 1,
  ταχα: 1,
  τει: 1,
  την: 1,
  τησ: 1,
  τιποτα: 1,
  τιποτε: 1,
  τισ: 1,
  τον: 1,
  τοτε: 1,
  του: 1,
  τουσ: 1,
  τσα: 1,
  τσε: 1,
  τσι: 1,
  τσου: 1,
  των: 1,
  υπο: 1,
  υποψη: 1,
  υποψιν: 1,
  υστερα: 1,
  φετοσ: 1,
  φισ: 1,
  φπα: 1,
  χαφ: 1,
  χθεσ: 1,
  χτεσ: 1,
  χωρισ: 1,
  ωσ: 1,
  ωσαν: 1,
  ωσοτου: 1,
  ωσπου: 1,
  ωστε: 1,
  ωστοσο: 1,
};

module.exports = StemmerEl;
