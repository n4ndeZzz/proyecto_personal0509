/* =========================================================================
   sprites.js
   -------------------------------------------------------------------------
   Definiciones (formas + paletas) de todo el pixel art del sitio, y
   funciones de conveniencia para pintarlas en un contenedor.

   Regla de color para animalitos: SIEMPRE una pareja blanco + negro.
   EXCEPCIONES ACTUALES: la pareja de pingüinos de bienvenida
   (PENGUINS_SHAPE) y la pareja de gatitos (CATS_SHAPE) son ilustraciones
   combinadas dibujadas a mano, cada una con sus propios colores
   originales — ver la nota junto a cada definición. Estas excepciones
   son puntuales; cualquier animalito futuro nuevo debe seguir la regla
   blanco + negro salvo que se indique lo contrario.
   Regla de flores: SIEMPRE lirios (rosados/fucsia, tallo verde).
   EXCEPCIÓN: la escena "elige tu favorita" usa 3 flores distintas a
   propósito (FLOWER_PINK_SHAPE, FLOWER_TULIP_SHAPE, FLOWER_ROSE_SHAPE),
   no lirios repetidos.
   ========================================================================= */

window.Sprites = (function (PixelArt) {
  // ---- Colores base compartidos -----------------------------------------
  const OUTLINE_ON_LIGHT = "#3b2b2f"; // outline sobre fondo claro
  const BLUSH = "#f6a8c4";
  const EYE_DARK = "#2a2222";

  // -------------------------------------------------------------------
  // PAREJA DE PINGÜINOS DE BIENVENIDA (dibujada a mano como una sola
  // imagen combinada, azul + rosado ya apoyados entre sí)
  // EXCEPCIÓN INTENCIONAL a la regla de "animalitos en pareja siempre
  // blanco y negro" (ver nota al inicio del archivo). Usa sus colores
  // originales (azul/rosado) tal como fue dibujada a mano en una
  // cuadrícula de 40x20. No "corregir" esto a blanco/negro.
  // Claves: K=outline B=pingüino azul (cuerpo) P=pingüino rosado (cuerpo)
  //         W=panza N=pico/pata
  // -------------------------------------------------------------------
  const PENGUINS_SHAPE = [
    "                                   ",
    "                                   ",
    "                                   ",
    "       KKKKK      KKKKK            ",
    "     KKBBBBBKK  KKPPPPPKK          ",
    "    KBBBBBBBBBKKPPPPPPPPPK         ",
    "   KBBBBBBBBBBBKPPPPPPPPPPK        ",
    "   KBBBBBBBBBBBKPPPPPPPPPPK        ",
    "  KBBBBKKBBBBBKPPPPPPKKPPPPK       ",
    "  KBBBWWKBKKBKKPKPKKPKWWPPPK       ",
    " KBBBBWWBBNNKBKKPKNNPPWWPPPPK      ",
    "KBBBBBBBBBKKBBBKPPKKPPPPPPPPPK     ",
    "KBBBBBBWWWWWBBBKPPWWWWWPPPPPPK     ",
    "KBBBKWWWWWWWWBKPPWWWWWWWWKPPPK     ",
    "KBBBKWWWWWWWWWKPWWWWWWWWWKPPPK     ",
    "KBBKWWWWWWWWWWKWWWWWWWWWWWKPPK     ",
    " KKWWWWWWWWWWWKWWWWWWWWWWWWKK      ",
    "  KKWWWWWWWWWKKKWWWWWWWWWWKK       ",
    "   KKNNKKKKNNK KKNNKKKKNNKK        ",
    "     KK    KK    KK    KK          ",
  ];

  const PENGUINS_PALETTE = {
    K: "#3b2b2f",
    B: "#a8c2de",
    P: "#f5aaae",
    W: "#f4d29c",
    N: "#df7126",
  };

  // Rama simple debajo de los pájaros
  const BRANCH_SHAPE = ["KKKKKKKKKKKKKKKKKKKK", "BBBBBBBBBBBBBBBBBBBB"];
  const BRANCH_PALETTE = { K: "#5c4330", B: "#8a6a45" };

  // -------------------------------------------------------------------
  // PAREJA DE GATITOS (dibujada a mano como una sola imagen combinada,
  // en una cuadrícula de 40x20 — mismo enfoque que PENGUINS_SHAPE)
  // EXCEPCIÓN INTENCIONAL a la regla de "animalitos en pareja siempre
  // blanco y negro" (ver nota al inicio del archivo). Usa sus colores
  // originales tal como fue dibujada a mano. No "corregir" esto a
  // blanco/negro.
  // Claves: K=outline F=pelaje claro C=pelaje crema D=pelaje oscuro
  //         T=pelaje tostado G=pelaje gris claro H=pelaje gris oscuro
  //         P=blush E=ojo
  // -------------------------------------------------------------------
  const CATS_SHAPE = [
    "                                        ",
    "          KK       K K       KK         ",
    "         KDDK     KDKHK     KHHK        ",
    "         KDPDKKKKKDPKPHKKKKKHPHK        ",
    "         KDPPTTCCTPPKPPHGGGHPPHK        ",
    "        KDFCTCCTTCTCKGGGFGGGGGHHK       ",
    "    K   KCCCCTTDDTCCKGGFFFGHHGGHK   K   ",
    "   KKK KCCCTTEDDDDKKKKKFFFFEHHGGHK KKK  ",
    "   KDKKCCCTPPEDDKDDPKPGFKFFEPPGGGHKKHK  ",
    "   KDTKKCCTDDDDDDDDDKGFFFFFFGGGGGKKHHK  ",
    "  KKDTTTKKCTTTDDDDTTKFFFFFFFFGGKKHHHHKK ",
    "  KDDTTTKCKKCCTTTTCCKFFFFFFFFKKGKHGGHHK ",
    "  KDTTTKCCCCCCCCCCCCKFFFFFFFFFGGGKGGHHK ",
    "  KKDTCCCCFFFFFCCFFCKFFFFFFFFFFGGGGHHKK ",
    "   KDTTTCCCFFCFFFFDCKFHFFFFFFFFFGGGHHK  ",
    "   KKDDTTCCCCCDDFDCCKFFHFHHFFFFFFGGHKK  ",
    "    KKKDTTTCCCCCDCCTKFFFHFFFFFFFFFKKK   ",
    "      KKDDTTKTTTDTTTKFFFHFFFKFFFFKK     ",
    "        KKDDKDDDKDDDKFFFKFFFKFFKK       ",
    "         KKK KKK KKK KKK KKK KKK        ",
  ];

  const CATS_PALETTE = {
    K: "#3b2b2f",
    F: "#fcfcfc",
    C: "#e9d9cc",
    D: "#4c442f",
    T: "#a28a6e",
    G: "#c7bfb4",
    H: "#9c9186",
    P: "#e1c0c9",
    E: "#4487bb",
  };

  // -------------------------------------------------------------------
  // FLORES "ELIGE TU FAVORITA" (dibujadas a mano, 3 flores distintas)
  // EXCEPCIÓN a la regla de flores del inicio del archivo: esta escena
  // usa 3 flores distintas a propósito (no lirios repetidos).
  // -------------------------------------------------------------------
  const FLOWER_PINK_SHAPE = [
    "...............",
    ".......AB......",
    "..CD..AB.......",
    "..DCE.AB.FG....",
    "..EDHEAIFG.....",
    ".DDEJHHFG......",
    "DKHHHJHG.......",
    "..FDBHCGG......",
    ".FDDBBGCG......",
    ".DDB..GGCG.....",
    ".DB....LGC.....",
    ".B.....L.......",
    "...MMM.LNNN....",
    ".....MLM.MMN...",
    "....NNL........",
    "...NOOL.NNNNN..",
    "..NOMMLPPPPPNN.",
    ".NOM..LP...MMN.",
    ".NM...L.....MMN",
    ".O............N",
  ];
  const FLOWER_PINK_PALETTE = {
    A: "#f1b1bf",
    B: "#e9879e",
    C: "#ffd9e4",
    D: "#f3b1bf",
    E: "#982d37",
    F: "#ffdae2",
    G: "#f4b2c0",
    H: "#e16f88",
    I: "#e46d89",
    J: "#ffbd4d",
    K: "#ec869c",
    L: "#32603b",
    M: "#4c7a53",
    N: "#50a85e",
    O: "#4d8e56",
    P: "#4e8f57",
  };

  const FLOWER_TULIP_SHAPE = [
    ".........",
    ".A.AAA.B.",
    "AACDDCDEA",
    "FGHDCDDEE",
    "FGHDIDEJE",
    "FEECFDEJE",
    "FEECFDEJF",
    "FJECFEJJF",
    "FJJCFJJFF",
    ".FJHCJFF.",
    "..FHHKK..",
    "....L....",
    "M...L...N",
    "M...L..NO",
    "PM..Q..NO",
    "RM..Q..OR",
    ".PM.Q.NOR",
    ".RP.Q.NOR",
    ".RPPSTOR.",
    "..RPSORR.",
  ];
  const FLOWER_TULIP_PALETTE = {
    A: "#ff98ab",
    B: "#f96f88",
    C: "#a62a42",
    D: "#f87088",
    E: "#f15471",
    F: "#c43b55",
    G: "#f97189",
    H: "#701224",
    I: "#721124",
    J: "#e04b69",
    K: "#a92942",
    L: "#152906",
    M: "#50971d",
    N: "#40721b",
    O: "#315d12",
    P: "#3d7915",
    Q: "#2b5911",
    R: "#1e4205",
    S: "#122a06",
    T: "#40721d",
  };

  // Rosa roja — tiene muchos más colores que las otras dos (47) porque el
  // diseño original tiene mucho degradado de sombras en los pétalos; es
  // intencional, prioriza la fidelidad al dibujo original.
  const FLOWER_ROSE_SHAPE = [
    ".....AABBB.......",
    "....CDDEFDG......",
    "....CFHIHDCGC....",
    "..JJKFFELMNGOC...",
    ".JPJKJLLLMQGOC...",
    ".JRSJTJJUVMOWC...",
    "..EXYZUUMMabc....",
    "...deGGGPPbFc....",
    "...GfLLGgggZc....",
    "...GLfffGhhi.....",
    "....GjjjjGG......",
    ".....kkkkl.......",
    ".......lml...nkkk",
    "loooo...l...npqk.",
    ".lrrsoo.l..npqtk.",
    ".luusto.o.nqqtk..",
    "..ottto.o.ktttk..",
    "...oooool.kkkk...",
    "........ln.......",
    "........o........",
  ];
  const FLOWER_ROSE_PALETTE = {
    A: "#711218", B: "#4f142a", C: "#6f161c", D: "#fe3b41", E: "#73141a",
    F: "#d5131c", G: "#4f1524", H: "#511424", I: "#f6403f", J: "#4e1423",
    K: "#a70f1e", L: "#a90d1b", M: "#4c1623", N: "#fa3e3d", O: "#a90c1f",
    P: "#a80d1d", Q: "#a80c21", R: "#d4151a", S: "#fa3f3a", T: "#fe3b39",
    U: "#d7111e", V: "#ff3941", W: "#ff3741", X: "#a90c1d", Y: "#6c1619",
    Z: "#a60e1d", a: "#a90c21", b: "#fe3b3f", c: "#521326", d: "#6f161a",
    e: "#ff3841", f: "#d3111a", g: "#d3141c", h: "#a2101b", i: "#70151c",
    j: "#ac0b1b", k: "#0b3831", l: "#214927", m: "#215628", n: "#204a26",
    o: "#0b392f", p: "#82b044", q: "#3f832c", r: "#87ae43", s: "#3d832a",
    t: "#1e5825", u: "#2a7027",
  };

  // -------------------------------------------------------------------
  // RETRATOS DE LA PAREJA (pixel art extraído a partir de 2 fotos reales
  // generadas en estilo pixel art, cuadrícula de 80x80, colores exactos).
  // EL = él (suéter verde), ELLA = ella. No "limpiar" ni cuantizar estos
  // colores, son el resultado ya verificado de la extracción pixel por
  // pixel — deben quedar exactamente como están.
  // -------------------------------------------------------------------
  const PORTRAIT_EL_SHAPE = [
    "................................AAABC.BDEFGFFEDB................................",
    ".............................CAAEHHHIBHJKKKJLKKMBAC.............................",
    "...........................NNOGHPGGPQRPMOIOMPOSTRHDN............................",
    "..........................BEOJPPRKIRLPTTRQIOOGRPOOOHC...........................",
    ".........................BIKKPTQKDOMJTTKKRIIJQJMKKKMOBB.........................",
    "........................UHMIRTPJMDDOJQTMMQMMGFMIRQGOPHEUN.......................",
    ".......................AHPMIVVJOPQQISQRMIQRKOOMRLVFOFJOHB.......................",
    "......................OFPMOITRJOGTLGMIIJJOPQPGMILRFOIOIJGD......................",
    "....................NAEJMOMSTSKKVTLQJMOJPMKKKQMOQJKKKMOPFKAN....................",
    "....................AHLKOIJRQIMQPVTVQPIJVVIOIVMORMIRQJIVMOHA....................",
    "....................UHPLLQMIVQJOOKQLLVVVJOGLPQMOQMIVTQVVKORA....................",
    "...................BSVTTPDKFRMMFJGVLVGOGGOIKRVGJRMIQMIIPPJHC....................",
    "...................DRLJGPOJVJMKQTTTTTPMSKMMKSVTTJIMRKMMKFTRBC...................",
    "...................IEPOKVIJFOGQLPGFFFFGIIRGKOGPFOOMPLQROMRGRS...................",
    "...................DJIOKQPVJOGRPRIWXXXWDGOXBPIOIPPJIFVLPVPOJD...................",
    ".................NOFJOJPLLTVGMKRYZXXXXaIQGXYHGPPVTFOGQVTQVOKFOC.................",
    ".................CHLJMSFLLQFYIMKYbXaWZYSFYWZYYYITTGOMJQTJKMJLHC.................",
    ".................CHPTQOKQVRDcDJORYadaZPGIaefaaaWFGSOOMTEMOQTPHC.................",
    ".................CHLTVPVTVRKWZYHbadgggaaagdgggggaWYTRRLIMERMOHC.................",
    ".................CHKJQTTVRIbXaWBWgdgdhcchdddddddcgXYYIRSFQKKKHC.................",
    ".................CHIMGFPVRbaZacidggggddgdddggggggdaXabRQVFOJLRC.................",
    ".................CHTJOOKTEYaWciciiiicgdggdgciiiiiicXWYEVKOOKLHC.................",
    "..................CKPJJGLHbWDIIIIIIIWigddgiWIIIIIIIDXbRLGJJPKC..................",
    "...................IRLTTGDYYRQQQQQTHYWaaaaWYHQQQQTQRYYDGTTTRI...................",
    "...................DRPVTFZDHEVVLLLVPRSWXXWSRPVVVLVPPRDZSTVPRK...................",
    "...................BSPVTFZDDjbbbbbbbbbXXXWbbbbbbbbbjIDZFTVPSB...................",
    "...................UIRLTFbbZiXbYYYbZbZXaaXZZZbYYYbXcZbbSTLRIU...................",
    "...................SSYSPFZbZXYSRRRSYZbXggXbZYSRRRSYWZZZSPSYSJ...................",
    "...................DDZaBGXgWFPOWZWDRYZXggXZYHDWZWIPFWgXFBgZDM...................",
    "...................IDZiYRXdjIXgdgcjIbZXggXXbIjcgggWIWgXEYibDM...................",
    "...................DDZZYDXaciaXZZZaiaZXgaXXaiaZZZXaicaXDYZZDS...................",
    "...................MYibbZXahggddddfeWXXgaXXaefdeeefghaXbbbiOS...................",
    "...................SYibbXXacddddhhecaXXgaXXacddhhddghaXXbbiOG...................",
    "...................BYZZXWZacddddddfaWXWggWXWafdddddfhaXaXZWYB...................",
    "....................AHaaXXacdhdddhfXZWhddeXXXehdddddcaXWgfHU....................",
    "....................AHfiaSWighddhaXZaffggggaZXachhdgiXSfieHA....................",
    "....................CBBbBRbaddddhaabZdggdggXbaahhhdfaYRBbBBC....................",
    "......................FRTVYXhfddffhgYIcddcIYfcffhhdhXYLTRF......................",
    ".......................BELYXeegfcicjWDbbYbDWjciiffeeXYLEB.......................",
    ".......................AHLYXefccWWbRQQHMSHRQRbWWicfeXYLHA.......................",
    ".......................ASLYXefaWQFDDDIDDDDIDDDFVWageXYLSA.......................",
    "........................NEYXeiBRIYgXXXXXXWWWWgYDRbifXYEN........................",
    "........................NHDYahWbfbYUUUUUUUUUUYbabjeaYDHN........................",
    ".........................BGMWadicWbUCNNNNNNCUbWcidajMFB.........................",
    "..........................OSaXWefhebbZbbbbZbbhhfeWXaSO..........................",
    "...........................AFZaWfefaXXaXXaXWgeefWaZFA...........................",
    "...........................NBBbXgeehgWYYYYWghehgXbBBN...........................",
    ".............................IDageddcjRQQRjiedegaDI.............................",
    ".............................OEDWafeegaMMafeefaWDEO.............................",
    ".............................IDJYXieeeibbieefiXYFDO.............................",
    ".............................IYIRSYehfgccfgdeYSQIYO.............................",
    ".............................OYZGTLDbiccccibDLQGZYO.............................",
    ".............................IYZYDTRKIIIIIIKRTDYZYO.............................",
    ".............................IbXZYDSTTTQQQTTSDYZXbI.............................",
    ".............................IbiabZYRVVVVLVRYZbaibO.............................",
    ".............................DXiaZbbYYYYYYYYbZZaiXD.............................",
    "............................OHWihabbZZZZZZZZbbaeiWHO............................",
    "........................CMMMAbWccaXZbbbbbbbbZXghcWWAJSSC........................",
    ".......................CHklMAjacddiabbZbbbZbaieecajAMmkHCNN.....................",
    "....................FEEHInoIAjacdddffZbbbbZhfhhehajADolOHHHGN...................",
    ".................NKJkkkkkpqkAjacfhddcgaaaagchheecajCkqpkrkrkGFC.................",
    "..............NCFFIOsooqktnrCBYceededcchhhcdhdeecYBCkqqkpqqrkOGGCC..............",
    "............CCHHkksqpuurkrvrAAMYggieeggggggdhidgbDAArqrkrurrwxrkHHAC............",
    "..........CCFGOkqmsxruuyrkrorCAMYbjcciiiiiiccjbYSACrorkrnssprplmkOGGAC..........",
    "........CAHHsolsssssprruwrkrrCAkMMIYbbbbbbbbYIMMkACrrkrvxxruuvmsslosHGAC........",
    "......CAHHksrrssxpwppssppqrkrAAlookSKSSSSKKKSkoolAArkrvpxxuuuvspxrrrrkGHAA......",
    ".....BHSmlrqttupptttppptprnxkkCArpuooqqqoooootprACkktqvuullypxwttpxwtromMHO.....",
    "....OMkolxpppwxuwtppuppturrlrkACnutrrrrrrrrrptqrmCkrqplurtnlxsnttwswptwmorDM....",
    ".NOMDoosxwlppxsswppuupxuwuupqrkCkktrrrrupprrrtkkCmrquuuuwxwxuvtupxwxxwsxsooOKI..",
    ".JOkossxxwlxxxpuxxxpxpppxpuxxurCCkkkkkkkkkkkkkkCCknpvuuuxsxxuyxxxpwxxsxwlxsmkkD.",
    "CGrosxxxwxxxxuuusxxxwpxxxxuxxxroCmrsrrrrsrrrskmCorxswwwxwsxxwwlxxwyxsxxlwwxsorMC",
    "HkosxwwllwxwwypxsxwxvuuwywxxxwtroCArqttwwvvqrmCorwxwwllvxlyxywwlwluxxlllwwwwsorH",
    "HkoxwyyyywyyllwuwyytyuvnltuxpttlroCokrqntqrkoCornxwnllwwvttyuuullyvwlnnvuyllyorH",
    "HkoxwwtoollyvuxllnvwuwltypppwtvyvroUCokkkkoACorlpwllnvwyllvypwlvnywqtnvqolllwokH",
    "HkowllwkkqllxxwlnllwvlyvxpwwxwuuyqrACCCCCCCCArowwwmlwwvvllwwlvywwwvlwwykkyywwokH",
    "HkoxwwsOkollwxwqlwwwvwywwlwwwwyvnyqrkAAAAAAkrlwyylllwwyvylyyyywxxvqlwwqkOplwwokH",
    "HkoxwulrkqllywwnvwyvtvllllvyvvlnvyynorrrrrronlyvyvvyyynlvyyvvyvywnqlvllkryllwokH",
    "HkoylnllkoollmqqqqqqnllqqqnnqnqqqqqqnlqmoqqnnqnvnnvnqnqqvnlnnnqqqqqqnllkmmlqqokH",
  ];
  const PORTRAIT_EL_PALETTE = {
    A: "#767859", B: "#69533d", C: "#b1ada6", D: "#2f1e23", E: "#04010d",
    F: "#0f0a13", G: "#080810", H: "#000002", I: "#362a2d", J: "#0f0f18",
    K: "#1a1921", L: "#000110", M: "#1e1f22", N: "#e2dbda", O: "#383433",
    P: "#040510", Q: "#00000d", R: "#00000a", S: "#19121a", T: "#00000f",
    U: "#c59674", V: "#01010f", W: "#c56f4d", X: "#c46646", Y: "#70392f",
    Z: "#bc563c", a: "#e17d52", b: "#a24d39", c: "#f08d5a", d: "#eb8b59",
    e: "#e98c5a", f: "#e88a59", g: "#e88857", h: "#ec8c5a", i: "#fa955f",
    j: "#c77d5e", k: "#4a5229", l: "#5e6836", m: "#62683a", n: "#5e6935",
    o: "#626c38", p: "#5d6733", q: "#5f6a35", r: "#5b6531", s: "#5d6536",
    t: "#5d6833", u: "#5e6732", v: "#5e6833", w: "#5e6735", x: "#5e6635",
    y: "#5e6834",
  };

  const PORTRAIT_ELLA_SHAPE = [
    "............................ABCDDDDEF.FGHIIDCJ............................",
    "..........................KLMBNNNOHDPNQIHNPRNHESTF........................",
    "........................FSUQVLLWLXJBDIIHJLWSLBQDGUY.......................",
    ".......................YUEZWaZWLbRcLJIEZJdRaLXWRBIUY......................",
    "....................YYSUNeaVGfLLaZHBZIQBCDVeRBfXWcNUY.....................",
    "...................YYgUNeJGQJXLLXXeHDHIDHIObJhZOaXbNUY....................",
    "..................YFYPPeJPVReOOOONOJQIHHDVbeLLLRMPbWbUY...................",
    ".................YYYUQbJPZZQEPbbabBEHIHiRLXROEBLeBMbXbUY..................",
    "................YYYUPWaMddEMbbWJEQJBHbHBLWebaQiBLLBgbeEUY.................",
    "...............FUNCCbLZORjQWbHIHDDGBZkDDDDCIEWbMBeNDCabPUY................",
    "...............FUNDObcVVGPcJHIIGVXWWlmWWWWWHCJbeEGNVOEXbQUF...............",
    "...............YgHCbWEVGOcVEIIPlknoonnoooooSXGGeeVRLLVcLbPY...............",
    "..............KUHIVWLjGQZVeVDEknopKqKqqqqqKppSlGbXJVWWVZXRUK..............",
    "..............XHHCJXViEJcbJMEknpKqrssttttrtqqoulgVbaVWLVceOX..............",
    "..............UIDRLVCMbbRBDiknpqvswwwssswwrxxTpmlGEbPbLWBaVG..............",
    ".............KjIghXPDPeBHDMknpqswwwwwwsswwssyqpuSEibBQBWWBcOb.............",
    ".............ZIDVLWPHLaCHOknzqswwwwwwssswssrrrqpnXBXLbMBLVJNj.............",
    "...........AVGHDRWPDHbaiCSmpKxrrrwwwwsswwrtrrsxqolOJbbbGfRJNB.............",
    "...........bLNiDfRPQDQaHGlnzqtwrrwwwwwwwwrwrrtxqpnWUBfbGdVJBQF............",
    "..........FY.dCPJVJVDNaDhkpqysswrswrwwwswrrrtrryqoSBZLWOdfJBDMF...........",
    "..........XFFEHJfVeODQaGlnpqxssssswwswswsrrtxttxquuaGWXJQQJbDRYF..........",
    "..........SFaUcPIZXPIJbGlozqrrrtrwwwrrwwrrstrrssrpulPBZWNOWXfXFX..........",
    "..........SbRJbCDZLNiLcbmpKrrwwqqrrrrrrrrwqwtrrswKnk0DPXfZXLbeFVF.........",
    ".........FgGHbEiVLVgbeMlnSLXXSm1tqrrrrrtqx1mXXXWYKnm0COXRRXLWMYYY.........",
    ".........YVBQaCBWWPMLM0kSWLWLcaLY1trrrtt1YbJfWLXbYumhGVLdghLLUSFY.........",
    "........FUFSfQDBXRMbaC0lSpKKTYXXSuKxrtxKulXXSTKKpSXmhIXcQBgcWUSFY.........",
    "........FbFeJVDVLBcLEChnpwonnooumnzrrtrznmnyonnozKnm0iXJPaQCeUSFY.........",
    "........YFYUJbEeJMJLPChnymlllWSzumpqtxqpmupklWWlkzum0jLOOaNiegeSY.........",
    "........YFYUEaOXdGJLQGWkl0GUjSSSpuuzqqzumoSUJSXU0lku0icRGcVGeQUL..........",
    "........YJJfPPPXcGaLQGWkUNNY2FKSSzupqqpmzSMe2FTYbUSn0GVeGJVRVQZJF.........",
    ".........XUeNGBbEgEbNCaml22222AKmpnpqqpnzSR222KAYlnu0REPghVJEEeUY.........",
    "........FVjEaPbhGcVJeghnzu222KTKqqnpKqxzyp222KTpnzqnhagQWVcVHELBY.........",
    ".......FUDIibNRHMJWOWahnKqumuuunqKupAqrrrqumuuunrqru0abMcVcLjDBaEF........",
    ".......YUHHRaHIGVWOCbahnqxwwxxxrtKnpKqtrrtwstttrrxqu0jXcVRhXBIIJOF........",
    "......KUHHRWQDHMafCIVJhnqtrrrrrrrrzzKqttrrrtrrtrttqn0HXZfZVaeHPXPF........",
    "......YiHVecMiDVWVQDRJhnqtrttttrxKnpqxqqqrrrtxxtttqn0CaJOBCDbEEbRX........",
    "......UGUZXEDiCPEhfCabhnqtttxtttrpmpKKzpprtttttttxru0GOaCDIDbQCVbUF.......",
    "......gXYEVjCVVCOcEDWNhnqxtxxttxqnmzKKzuoqxtttrttxqn0CZaCHDfWECNPYYK......",
    "......UYFUIghWaPLVGJVGhnqxttttxxqnkkuukknqytttttxqok0HLJDICbVEcHUFYF......",
    "......UYFUHJLbMVaMDbWHOkKxtttxxtxrukkkku1tsxtrttxqnWGPXJDgaVGQLJMFYF......",
    "......UYFUQbBaGBXVgbLH0koqtrtxtttqtxmmttrtxqqr1txqohMWegMfWWEEXBY.XF......",
    "......JXYUaLOaDOLfGaLHOlnKxtttrqxxxtrrqqqqKpptrttvk0bLhMZVhLEEJUY.SF......",
    ".......eUDJLObOGBZBeJMD0m1tt1rzpKqq111pppzumn1rtqnWGWeGVJGaLHDHUYXF.......",
    ".......FUHVeQcLBCZXJjiHOlpqt1qpmuooooonmmkkur1rzKu0DWbGVcCVWZCIHUL........",
    ".......FUHGbQiXbGcLPZjHDWuzr11xnmmmmmmmmmmpKxrtqzlMihW0BeOGbXfDjUFFK......",
    ".......LGVPaQQWOCcXObQIHOlpqxttqqnmmmupnnqqxtt1zkOIIQLbOXRCOWLfigLBF......",
    "......bUIEcWEQbGDcXNQHHHIhmrqtr11xnnnnonzrxttxKolDjIDVeVbRCDOWbCHGUT......",
    ".....JXFUfWBDHEiIQPcQIHHHElpqxr1t1zzpzpzq1ttxqplEHHIHDVeVbVCDBaCHgF.......",
    "....bg.FMXVGHDDICZVibMHHHIglmtqt111111qqtr1zqplMIHIHbQEWRcXBIEaiQHOA......",
    "...ABS.Y0LPDDOiDMaVDWBDHHiIglnrrtrttttrtrtxqzkMIHIiDbeMfVVWWEVaBXcUF......",
    "...XE.YOWOCCVJGHhXVChLOIHiiillmzqxrtttrtxrKuklMIiiiOZfBbMGJXBbRVXLVUF.....",
    "...XNFMXZCiBcgVhLaPICbbDHHHHlkkkyKtxxxxzqyukllMIiiIbJGNXbEaaNjDQbLBSBF....",
    "...FVBBLZCCbEfLWLVCHiBaIHHHHlkmkkuwKKKqKpkkmllMiiiIbJNOLXVaBCIEVMbUKeB....",
    "....bUHcWNVVhLWWaQiIgaaIHHiilkmmkkkkkkkkkkmmklMIiiIbaVOXJMNEDMbaGMY.ZJ....",
    "...YMHDBXVcObLLaMIICJLaIHHHDlupmumkkkkkkmumpulgiiIDbadVOfBCIDELWbBe.ac....",
    "...XEFEHEgJBaLaMIiIcVJQIHiDMluKpmmmmmumummpKulEDIiIEOcdGZhgIEaEVXdUFbR....",
    "...SPFjDEJWPbeHIHIDaNHHHHHVlkmqqpmmmmmmmmpqqmklOHiIIHZVgVLBCEbGBLLVBUX....",
    "...SUHPcLbOgWbCIiiDaEDjHjDkkmurwrqnuuuunqqwtnmklGHiiHBCCMacMEWQVXeBGS.....",
    "..FYVVLWBGIDfefBCiDacBDHHOkunuqqwwqqqqqqwsswxnmkhGHiijBMaLLQCXbQbBCIY.....",
    "..SFXaXJCHDHaBXaGIIEWLVHClmmnpwwsvvssvyvswwvqzkmk0iiDQWbXVaJiBaDHQHMYY....",
    "..YYLbLcCiEbbCPWhMIDMLbDgSmmmstzyvvsvysvssyzqomnSEHHHOWLfGcXQDEEICJV.S....",
    "..XUUhLbODJXEDDOLVCIHLbOPBUlmpKqwvvyyyvvvywKpmSXGBQVEWXfGObWQDBaCPLOFKS...",
    ".YUMFBBfBGJXQCICVbPDgVLJEdBjXmXYyqqqqqqqqKpSmliEVdEEhWBCCBaWQDBaGabgCXJF..",
    "SUYTXEDICRWLPaagRXBGBMLJEdddNWlBaWbbbWWbWbWkXNZZdRViWeGIIDcLQCBaHQHIIGUX..",
    "dgFYUHIGDJXLQPeWWLfjBVLZPZddZBXSOHNNQNPOiPkSNdddRRRjbbCIDcXOgVLZUDDIHEOY..",
    "da.JgIElPVJWEGOXLLLfNLVMddddfZBWlWjRddZNWkWNZdddffdjBWBDGcbMHXVOS0hOIUS...",
    "RZYUHOkn0GGaJCOXJaLLQBGBddZdRdZNbllhBRQWkWNZdddfdfdMGcWGQWBCPbVkoSllQUX...",
    "TgUHi0nnSOHQBE0bMMbLEGVddddddfRZBhXlWVXkhNZfdddffffRMCQOWLBCDMbnSSuklUS...",
    ".XGHUhnmnnlMQRJZCCJLEEfddRRRZZZZcdBhlkYZVcZZccZdfffdVEDBXRgihibnumpnklL...",
    "..eOXOSSzpnWBlXCBjhXQVddddddjjjjjjjiSuXgjjjjjjjddZZffRVOefGMmPVmmXmKpkOS..",
    "..FloYYyTokBMnmjffWcMfRBEEEQSSSSSSSSmkuSSSSSSkSEQEEBRdcBQcOgmSG0SmnpKokY..",
    "..knpzwt1obUmm0QRbfMjBOWmkkkzqyzzzvvkkkqvvzyzqpkkkkaOBBZPMECaok0mnmpwqok..",
    "..kpnn1zqzlGmmGPPgMjhWuuoqvvttxxxxxqpkoqtxxxx1tvywouuW0BdPBHEuSSnupwyzKm..",
    ".FmpnxrvzYoYOmOVQNjWmoqqtrxxvvyyyyyyqrqsvyyyyvyyytrqqomhCJZPVmYppqqvvzqpF.",
    ".lnpxsyvzYXlkmEdcRSpp1tyyyvvvvyxvvvrrsrqsysstvvyvvvyvzonXVcROnvpqyxxvyvql.",
    ".kpzwyyywKFknmEdZBkTKqzzzzzzyytxvxwnzqpnqsstxvyzzzzzzqKzSBcRBurqyvvvvvszk.",
    "knqszvyyzyKwu0VZddZJFpKKKKKKyzzzzzxnuzmnrzzzzzvKKKKKKpmfcZZZVa1zwvvyxvyquk",
    "kzqyyvyyyy1nnOVdZZRRBhmmYmmmqKKKKKKKnonKKKKKKK1YmmmmYdBRfZZcVconqyyyyvyqzk",
    "kpqyvvvyyywnlBRddddddRQEEEEESSSSSSSSSlSSSSSSSSSEQQQQNdZZdddZdBSnqyvvvvvqpk",
    "kpqvvvvvvvwn0BddRdddddZZccccBNNQPNNPNBNPNNNQNPBZZdZccdddddddcB0oqxvttvxqpk",
  ];
  const PORTRAIT_ELLA_PALETTE = {
    A: "#f2eee9", B: "#121319", C: "#00000e", D: "#000010", E: "#080812",
    F: "#a8a29d", G: "#00000b", H: "#020412", I: "#000212", J: "#262525",
    K: "#f9d2af", L: "#3d3a31", M: "#06050f", N: "#0c0f17", O: "#100e16",
    P: "#0c0c15", Q: "#0a0b14", R: "#1a1c20", S: "#6e5149", T: "#f6caa8",
    U: "#000003", V: "#17161b", W: "#3a342c", X: "#433b34", Y: "#756b63",
    Z: "#201f22", a: "#2b2927", b: "#302d2a", c: "#222022", d: "#1d1e22",
    e: "#31352d", f: "#1d1c20", g: "#01010c", h: "#272122", i: "#010311",
    j: "#020712", k: "#b96347", l: "#70392b", m: "#d17e5d", n: "#ed9775",
    o: "#faad8a", p: "#f1b28e", q: "#fecba5", r: "#fdc8a3", s: "#fec7a3",
    t: "#fcc7a2", u: "#df9470", v: "#ffc6a1", w: "#ffc8a3", x: "#fcc6a1",
    y: "#fec5a1", z: "#fcc39f", 0: "#20171a", 1: "#f8c7a4", 2: "#237844",
  };

  // -------------------------------------------------------------------
  // CANDADO (login)
  // Claves: K=outline G=dorado D=dorado oscuro(sombra) H=ojo de llave
  // -------------------------------------------------------------------
  const LOCK_SHAPE = [
    "      KKK      ",
    "     KGGDK     ",
    "    KGGGDDK    ",
    "    KG   DK    ",
    "    KG   DK    ",
    "    KG   DK    ",
    "    KG   DK    ",
    "    KG   DK    ",
    "   KKG   DKK   ",
    "  KGGGGGDDDDK  ",
    " KGGGGGGDDDDDK ",
    " KGGGGGGDDDDDK ",
    " KGGGGHHHDDDDK ",
    " KGGGGHHHDDDDK ",
    " KGGGGGHDDDDDK ",
    " KGGGGGHDDDDDK ",
    " KGGGGGGDDDDDK ",
    " KGGGGGGDDDDDK ",
    "  KGGGGGDDDDK  ",
    "   KKKKKKKKK   ",
  ];
  const LOCK_PALETTE = {
    K: "#5c3d1f",
    G: "#e6c35c",
    D: "#c79f3a",
    H: "#3b2b2f",
  };

  // -------------------------------------------------------------------
  // CORAZÓN (reutilizable: fondo flotante, título, celebración)
  // -------------------------------------------------------------------
  const HEART_SHAPE = [" KK KK", "KRRKRRK", "KRRRRRRK", " KRRRRK", "  KRRK", "   KK"];
  function heartPalette(fill) {
    return { K: "#7a2331", R: fill || "#e8607a" };
  }

  // -------------------------------------------------------------------
  // DESTELLO (sparkle)
  // -------------------------------------------------------------------
  const SPARKLE_SHAPE = ["  Y", "  Y", "YYYYY", "  Y", "  Y"];
  const SPARKLE_PALETTE = { Y: "#f4d35e" };

  // ---- API pública --------------------------------------------------
  function renderPenguins(container, pixelSize) {
    PixelArt.render(container, PENGUINS_SHAPE, PENGUINS_PALETTE, pixelSize || 7);
  }

  function renderBranch(container, pixelSize) {
    PixelArt.render(container, BRANCH_SHAPE, BRANCH_PALETTE, pixelSize || 10);
  }

  function renderCats(container, pixelSize) {
    PixelArt.render(container, CATS_SHAPE, CATS_PALETTE, pixelSize || 7);
  }

  function renderFlower(container, kind, pixelSize) {
    const flowers = {
      pink: [FLOWER_PINK_SHAPE, FLOWER_PINK_PALETTE],
      tulip: [FLOWER_TULIP_SHAPE, FLOWER_TULIP_PALETTE],
      rose: [FLOWER_ROSE_SHAPE, FLOWER_ROSE_PALETTE],
    };
    const pair = flowers[kind] || flowers.pink;
    PixelArt.render(container, pair[0], pair[1], pixelSize || 9);
  }

  function renderPortrait(container, who, pixelSize) {
    const pair = who === "ella"
      ? [PORTRAIT_ELLA_SHAPE, PORTRAIT_ELLA_PALETTE]
      : [PORTRAIT_EL_SHAPE, PORTRAIT_EL_PALETTE];
    PixelArt.render(container, pair[0], pair[1], pixelSize || 2);
  }

  function renderLock(container, pixelSize) {
    PixelArt.render(container, LOCK_SHAPE, LOCK_PALETTE, pixelSize || 11);
  }

  function renderHeart(container, pixelSize, fill) {
    PixelArt.render(container, HEART_SHAPE, heartPalette(fill), pixelSize || 6);
  }

  function renderSparkle(container, pixelSize) {
    PixelArt.render(container, SPARKLE_SHAPE, SPARKLE_PALETTE, pixelSize || 5);
  }

  return {
    renderPenguins,
    renderBranch,
    renderCats,
    renderFlower,
    renderPortrait,
    renderLock,
    renderHeart,
    renderSparkle,
  };
})(window.PixelArt);
