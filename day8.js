/*
--- Day 8: Matchsticks ---

Space on the sleigh is limited this year, and so Santa will be bringing his list as a digital copy. He needs to know how much space it will take up when stored.

It is common in many programming languages to provide a way to escape special characters in strings. For example, C, JavaScript, Perl, Python, and even PHP handle special characters in very similar ways.

However, it is important to realize the difference between the number of characters in the code representation of the string literal and the number of characters in the in-memory string itself.

For example:

"" is 2 characters of code (the two double quotes), but the string contains zero characters.
"abc" is 5 characters of code, but 3 characters in the string data.
"aaa\"aaa" is 10 characters of code, but the string itself contains six "a" characters and a single, escaped quote character, for a total of 7 characters in the string data.
"\x27" is 6 characters of code, but the string itself contains just one - an apostrophe ('), escaped using hexadecimal notation.
Santa's list is a file that contains many double-quoted string literals, one on each line. The only escape sequences used are \\ (which represents a single backslash), \" (which represents a lone double-quote character), and \x plus two hexadecimal characters (which represents a single character with that ASCII code).

Disregarding the whitespace in the file, what is the number of characters of code for string literals minus the number of characters in memory for the values of the strings in total for the entire file?

For example, given the four strings above, the total number of characters of string code (2 + 5 + 10 + 6 = 23) minus the total number of characters in memory for string values (0 + 3 + 7 + 1 = 11) is 23 - 11 = 12.

Your puzzle answer was 1350.

--- Part Two ---

Now, let's go the other way. In addition to finding the number of characters of code, you should now encode each code representation as a new string and find the number of characters of the new encoded representation, including the surrounding double quotes.

For example:

"" encodes to "\"\"", an increase from 2 characters to 6.
"abc" encodes to "\"abc\"", an increase from 5 characters to 9.
"aaa\"aaa" encodes to "\"aaa\\\"aaa\"", an increase from 10 characters to 16.
"\x27" encodes to "\"\\x27\"", an increase from 6 characters to 11.
Your task is to find the total number of characters to represent the newly encoded strings minus the number of characters of code in each original string literal. For example, for the strings above, the total encoded length (6 + 9 + 16 + 11 = 42) minus the characters in the original code representation (23, just like in the first part of this puzzle) is 42 - 23 = 19.

Your puzzle answer was 2085.
*/

function tag(strings, ...values) {
  console.log(strings.raw[0]);
}

const input = String.raw`"qxfcsmh"
"ffsfyxbyuhqkpwatkjgudo"
"byc\x9dyxuafof\\\xa6uf\\axfozomj\\olh\x6a"
"jtqvz"
"uzezxa\"jgbmojtwyfbfguz"
"vqsremfk\x8fxiknektafj"
"wzntebpxnnt\"vqndz\"i\x47vvjqo\""
"higvez\"k\"riewqk"
"dlkrbhbrlfrp\\damiauyucwhty"
"d\""
"qlz"
"ku"
"yy\"\"uoao\"uripabop"
"saduyrntuswlnlkuppdro\\sicxosted"
"tj"
"zzphopswlwdhebwkxeurvizdv"
"xfoheirjoakrpofles\"nfu"
"q\xb7oh\"p\xce\"n"
"qeendp\"ercwgywdjeylxcv"
"dcmem"
"\"i\x13r\"l"
"ikso\xdcbvqnbrjduh\"uqudzki\xderwk"
"wfdsn"
"pwynglklryhtsqbno"
"hcoj\x63iccz\"v\"ttr"
"zf\x23\\hlj\\kkce\\d\\asy\"yyfestwcdxyfj"
"xs"
"m\"tvltapxdvtrxiy"
"bmud"
"k\"a"
"b\"oas"
"\"yexnjjupoqsxyqnquy\"uzfdvetqrc"
"vdw\xe3olxfgujaj"
"qomcxdnd\"\\cfoe\""
"fpul"
"m\"avamefphkpv"
"vvdnb\\x\\uhnxfw\"dpubfkxfmeuhnxisd"
"hey\\"
"ldaeigghlfey"
"eure\"hoy\xa5iezjp\\tm"
"yygb\"twbj\\r\"\x10gmxuhmp\""
"weirebp\x39mqonbtmfmd"
"ltuz\\hs\"e"
"ysvmpc"
"g\x8amjtt\"megl\"omsaihifwa"
"yimmm"
"iiyqfalh"
"cwknlaaf"
"q\x37feg\xc6s\"xx"
"uayrgeurgyp\\oi"
"xhug\"pt\"axugllbdiggzhvy"
"kdaarqmsjfx\xc3d"
"\"vkwla"
"d\""
"tmroz\"bvfinxoe\\mum\"wmm"
"\"n\"bbswxne\\p\\yr\"qhwpdd"
"skzlkietklkqovjhvj\xfe"
"pbg\\pab\"bubqaf\"obzcwxwywbs\\dhtq"
"xxjidvqh\"lx\\wu\"ij"
"daef\x5fe\x5b\\kbeeb\x13qnydtboof"
"ogvazaqy\"j\x73"
"y"
"n\"tibetedldy\\gsamm\"nwu"
"wldkvgdtqulwkad"
"dpmxnj"
"twybw\"cdvf\"mjdajurokbce"
"ru\"\\lasij\"i"
"roc\\vra\\lhrm"
"pbkt\x60booz\"fjlkc"
"j\x4dytvjwrzt"
"\\uiwjkniumxcs"
"cbhm\"nexccior\"v\"j\"nazxilmfp\x47"
"qdxngevzrlgoq"
"\"lrzxftytpobsdfyrtdqpjbpuwmm\x9e"
"mdag\x0asnck\xc2ggj\"slb\"fjy"
"wyqkhjuazdtcgkcxvjkpnjdae"
"aixfk\xc0iom\x21vueob"
"dkiiakyjpkffqlluhaetires"
"ysspv\"lysgkvnmwbbsy"
"gy\"ryexcjjxdm\"xswssgtr"
"s"
"ddxv"
"qwt\"\x27puilb\"pslmbrsxhrz"
"qdg\xc9e\\qwtknlvkol\x54oqvmchn\\"
"lvo"
"b"
"fk\"aa\"\"yenwch\\\\on"
"srig\x63hpwaavs\\\x80qzk\"xa\"\xe6u\\wr"
"yxjxuj\"ghyhhxfj\"\xa6qvatre"
"yoktqxjxkzrklkoeroil"
"\"jfmik\""
"smgseztzdwldikbqrh\""
"jftahgctf\"hoqy"
"tcnhicr\"znpgckt\"ble"
"vqktnkodh\"lo\"a\\bkmdjqqnsqr"
"ztnirfzqq"
"s"
"xx"
"iqj\"y\\hqgzflwrdsusasekyrxbp\\ad"
"\\xzjhlaiynkioz\"\"bxepzimvgwt"
"s\x36rbw"
"mniieztwrisvdx"
"atyfxioy\x2b\\"
"irde\x85\x5cvbah\\jekw\"ia"
"bdmftlhkwrprmpat\"prfaocvp"
"w\\k"
"umbpausy"
"zfauhpsangy"
"p\"zqyw"
"wtztypyqvnnxzvlvipnq\"zu"
"deicgwq\\oqvajpbov\\or\"kgplwu"
"mbzlfgpi\\\\zqcidjpzqdzxityxa"
"lfkxvhma"
"\xf2yduqzqr\"\\fak\"p\"n"
"mpajacfuxotonpadvng"
"anb\\telzvcdu\\a\xf2flfq"
"lrs\"ebethwpmuuc\"\x86ygr"
"qmvdbhtumzc\"ci"
"meet"
"yopg\x0fdxdq\"h\\ugsu\xffmolxjv"
"uhy"
"fzgidrtzycsireghazscvmwcfmw\\t"
"cqohkhpgvpru"
"bihyigtnvmevx\"xx"
"xz"
"zofomwotzuxsjk\"q\"mc\"js\"dnmalhxd"
"\\ktnddux\\fqvt\"ibnjntjcbn"
"ia"
"htjadnefwetyp\xd5kbrwfycbyy"
"\"\\hkuxqddnao"
"meqqsz\x83luecpgaem"
"cvks\x87frvxo\"svqivqsdpgwhukmju"
"sgmxiai\\o\"riufxwjfigr\xdf"
"fgywdfecqufccpcdn"
"faghjoq\x28abxnpxj"
"zuppgzcfb\"dctvp\"elup\"zxkopx"
"xqs\x45xxdqcihbwghmzoa"
"anbnlp\\cgcvm\"hc"
"xf\"fgrngwzys"
"nrxsjduedcy\x24"
"\x71sxl\"gj\"sds\"ulcruguz\\t\\ssvjcwhi"
"jhj\"msch"
"qpovolktfwyiuyicbfeeju\x01"
"nkyxmb\"qyqultgt\"nmvzvvnxnb"
"ycsrkbstgzqb\"uv\\cisn"
"s"
"ueptjnn\"\"sh"
"lp\"z\"d\"mxtxiy"
"yzjtvockdnvbubqabjourf\"k\"uoxwle"
"\x82\"wqm\""
"\xb5cwtuks\x5fpgh"
"wd"
"tbvf"
"ttbmzdgn"
"vfpiyfdejyrlbgcdtwzbnm"
"uc"
"otdcmhpjagqix"
"\\\xb1qso\"s"
"scowax"
"behpstjdh\xccqlgnqjyz\"eesn"
"r\xe1cbnjwzveoomkzlo\\kxlfouhm"
"jgrl"
"kzqs\\r"
"ctscb\x7fthwkdyko\"\x62pkf\"d\xe6knmhurg"
"tc\"kw\x3ftt"
"bxb\x5ccl"
"jyrmfbphsldwpq"
"jylpvysl\"\"juducjg"
"en\\m\"kxpq\"wpb\\\""
"madouht\"bmdwvnyqvpnawiphgac\""
"vuxpk\"ltucrw"
"aae\x60arr"
"ttitnne\"kilkrgssnr\xfdurzh"
"oalw"
"pc\"\"gktkdykzbdpkwigucqni\"nxiqx"
"dbrsaj"
"bgzsowyxcbrvhtvekhsh\"qgd"
"kudfemvk\"\"\"hkbrbil\"chkqoa"
"zjzgj\\ekbhyfzufy"
"\\acos\"fqekuxqzxbmkbnn\x1ejzwrm"
"elxahvudn\"txtmomotgw"
"\x2eoxmwdhelpr\"cgi\xf7pzvb"
"eapheklx"
"hfvma\"mietvc\"tszbbm\"czex"
"h\"iiockj\\\xc1et"
"d\"rmjjftm"
"qlvhdcbqtyrhlc\\"
"yy\"rsucjtulm\"coryri\"eqjlbmk"
"tv"
"r\"bfuht\\jjgujp\""
"kukxvuauamtdosngdjlkauylttaokaj"
"srgost\"\"rbkcqtlccu\x65ohjptstrjkzy"
"yxwxl\\yjilwwxffrjjuazmzjs"
"dxlw\\fkstu\"hjrtiafhyuoh\"sewabne"
"\x88sj\"v"
"rfzprz\xec\"oxqclu\"krzefp\\q"
"cfmhdbjuhrcymgxpylllyvpni"
"ucrmjvmimmcq\x88\xd9\"lz"
"lujtt\""
"gvbqoixn\"pmledpjmo\"flydnwkfxllf"
"dvxqlbshhmelsk\x8big\"l"
"mx\x54lma\x8bbguxejg"
"\x66jdati\xeceieo"
"\"iyyupixei\x54ff"
"xohzf\"rbxsoksxamiu"
"vlhthspeshzbppa\x4drhqnohjop\"\"mfjd"
"f\"tvxxla\"vurian\"\"idjq\x3aptm\xc3olep"
"gzqz"
"kbq\\wogye\\altvi\\hbvmodny"
"j\xd8"
"ofjozdhkblvndl"
"hbitoupimbawimxlxqze"
"ypeleimnme"
"xfwdrzsc\\oxqamawyizvi\\y"
"enoikppx\xa1ixe\"yo\"gumye"
"fb"
"vzf"
"zxidr"
"cu\x31beirsywtskq"
"lxpjbvqzztafwezd"
"\\jyxeuo\x18bv"
"b\"vawc\"p\\\\giern\"b"
"odizunx\"\"t\\yicdn\"x\"sdiz"
"\"\"tebrtsi"
"ctyzsxv\xa6pegfkwsi\"tgyltaakytccb"
"htxwbofchvmzbppycccliyik\xe5a"
"ggsslefamsklezqkrd"
"rcep\"fnimwvvdx\"l"
"zyrzlqmd\x12egvqs\\llqyie"
"\x07gsqyrr\\rcyhyspsvn"
"butg\""
"gb"
"gywkoxf\"jsg\\wtopxvumirqxlwz"
"rj\"ir\"wldwveair\x2es\"dhjrdehbqnzl"
"ru\"elktnsbxufk\\ejufjfjlevt\\lrzd"
"\"widsvok"
"oy\"\x81nuesvw"
"ay"
"syticfac\x1cfjsivwlmy\"pumsqlqqzx"
"m"
"rjjkfh\x78cf\x2brgceg\"jmdyas\"\\xlv\xb6p"
"tmuvo\"\x3ffdqdovjmdmkgpstotojkv\"as"
"jd\\ojvynhxllfzzxvbn\"wrpphcvx"
"pz"
"\"twr"
"n\\hdzmxe\"mzjjeadlz"
"fb\"rprxuagvahjnri"
"rfmexmjjgh\\xrnmyvnatrvfruflaqjnd"
"obbbde\"co\"qr\"qpiwjgqahqm\\jjp\""
"vpbq\"\"y\"czk\\b\x52ed\"lnzepobp"
"syzeajzfarplydipny\"y\"\xe8ad"
"mpyodwb"
"\x47rakphlqqptd"
"wa\"oj\"aiy"
"a"
"ropozx"
"q\x51nbtlwa"
"etukvgx\\jqxlkq"
"\"tp\"rah\"pg\"s\"bpdtes\\tkasdhqd"
"dn\"qqpkikadowssb\xcah\"dzpsf\\ect\"jdh"
"pxunovbbrrn\\vullyn\"bno\"\"\"myfxlp\""
"qaixyazuryvkmoulhcqaotegfj\\mpzm"
"bvfrbicutzbjwn\\oml\"cf\"d\"ezcpv\"j"
"rmbrdtneudemigdhelmb"
"aq\\aurmbhy"
"wujqvzw"
"gf\"tssmvm\"gm\"hu\x9a\xb7yjawsa"
"hrhqqxow\xe2gsydtdspcfqy\"zw\\ou"
"ianwwf\\yko\\tdujhhqdi"
"xylz\"zpvpab"
"lwuopbeeegp"
"aoop\x49jhhcexdmdtun"
"\\\\mouqqcsgmz"
"tltuvwhveau\x43b\"ymxjlcgiymcynwt"
"gsugerumpyuhtjljbhrdyoj"
"lnjm\xb8wg\"ajh"
"zmspue\"nfttdon\\b\"eww"
"\"w\x67jwaq\x7ernmyvs\\rmdsuwydsd\"th"
"ogtgvtlmcvgllyv"
"z\"fqi\"rvddoehrciyl"
"yustxxtot\"muec\"xvfdbzunzvveq"
"mqslw"
"txqnyvzmibqgjs\xb6xy\x86nfalfyx"
"kzhehlmkholov"
"plpmywcnirrjutjguosh\\"
"pydbnqofv\"dn\\m"
"aegqof"
"eambmxt\\dxagoogl\\zapfwwlmk"
"afbmqitxxqhddlozuxcpjxgh"
"vgts"
"bfdpqtoxzzhmzcilehnflna"
"s\"idpz"
"\xcfhgly\"nlmztwybx\"ecezmsxaqw"
"aackfgndqcqiy"
"\x22unqdlsrvgzfaohoffgxzfpir\"s"
"abh\"ydv\"kbpdhrerl"
"bdzpg"
"ekwgkywtmzp"
"wtoodejqmrrgslhvnk\"pi\"ldnogpth"
"njro\x68qgbx\xe4af\"\\suan"`;

const assert = require('assert');

function countStringMemory(str) {
  return eval(str).length;
}

assert.equal(countStringMemory(String.raw`""`), 0);
assert.equal(countStringMemory(String.raw`"abc"`), 3);
assert.equal(countStringMemory(String.raw`"aaa\"aaa"`), 7);
assert.equal(countStringMemory(String.raw`"\x27"`), 1);


function countStringLiteral(str) {
  return str.length;
}

assert.equal(countStringLiteral(String.raw`""`), 2);
assert.equal(countStringLiteral(String.raw`"abc"`), 5);
assert.equal(countStringLiteral(String.raw`"aaa\"aaa"`), 10);
assert.equal(countStringLiteral(String.raw`"\x27"`), 6);

function countStringEncoding(str) {
  return JSON.stringify(str).length;
}

assert.equal(countStringEncoding(String.raw`""`), 6);
assert.equal(countStringEncoding(String.raw`"abc"`), 9);
assert.equal(countStringEncoding(String.raw`"aaa\"aaa"`), 16);
assert.equal(countStringEncoding(String.raw`"\x27"`), 11);

function findStringDifference(strs, func1, func2) {
  const x = strs.split('\n').map(func1).reduce((a, b) => a + b, 0);
  const y = strs.split('\n').map(func2).reduce((a, b) => a + b, 0);
  return x - y;
}

// Part 1
assert.equal(findStringDifference(String.raw`""
"abc"
"aaa\"aaa"
"\x27"`, countStringLiteral, countStringMemory), 12);
console.log(findStringDifference(input, countStringLiteral, countStringMemory));

// Part 2
assert.equal(findStringDifference(String.raw`""
"abc"
"aaa\"aaa"
"\x27"`, countStringEncoding, countStringLiteral), 19);
console.log(findStringDifference(input, countStringEncoding, countStringLiteral));
