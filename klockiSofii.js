//instrukcja - gra memory na canvasie 800x600
//do pliku html dodac ta biblioteke: <script src="memo.js" charset="UTF-8"></script>
//nastepnie w window.onload wywolac graMemory(argument) np:
//<script>
//	window.onload=function(){
//		graMemory("test");		
//	}
//	</script>
//jesli argument pozostanie pusty to gra (caly canvas tworzony dynamicznie) sie doczepi po prostu do body
//jesli jako argument poda sie id elementu to gra sie podczepi pod niego tu np. do: <div id="test"></div>

klocekPoprzedni=-1;
klockiOdsloniete=0;
minus1=0;
minus2=0;
menu="";
canvas = null;
c=null;

activeCore=24;

klockiCollected=[
-1,//nic nie znaczy, chce zaczac od 1, zeby latwiej bylo liczyc nr klockow
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1,
1//24		
];

klockiImg=[
"SofiaTlo.png",//tyl klocka
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png",
"Sofia.png"
];

klockiImgPomieszane=[
"SofiaTlo.png",//tyl klocka
"Sofia01.png",
"Sofia02.png",
"Sofia03.png",
"Sofia04.png",
"Sofia05.png",
"Sofia06.png",
"Sofia07.png",
"Sofia08.png",
"Sofia09.png",
"Sofia10.png",
"Sofia11.png",
"Sofia12.png",
"Sofia13.png",
"Sofia14.png",
"Sofia15.png",
"Sofia16.png",
"Sofia17.png",
"Sofia18.png",
"Sofia19.png",
"Sofia20.png",
"Sofia21.png",
"Sofia22.png",
"Sofia23.png",
"Sofia24.png"
];

klockiImgUlozone=[
"SofiaTlo.png",//tyl klocka
"Sofia01.png",
"Sofia02.png",
"Sofia03.png",
"Sofia04.png",
"Sofia05.png",
"Sofia06.png",
"Sofia07.png",
"Sofia08.png",
"Sofia09.png",
"Sofia10.png",
"Sofia11.png",
"Sofia12.png",
"Sofia13.png",
"Sofia14.png",
"Sofia15.png",
"Sofia16.png",
"Sofia17.png",
"Sofia18.png",
"Sofia19.png",
"Sofia20.png",
"Sofia21.png",
"Sofia22.png",
"Sofia23.png",
"Sofia24.png"
];

function sprawdzCzyKlocekJestAktywny(x){
	console.log("spr x: "+x);
	switch(activeCore%6){
		case 0://kolumna6
			if(activeCore<=6){
				if(
				activeCore+6==x||
				activeCore-1==x){
					return true;	
				}
			}
			if(activeCore>=24){
				console.log("in x="+x);
				if(
				activeCore-6==x||
				activeCore-1==x){
					return true;	
				}
			}
			if(activeCore>6&&activeCore<19){
				if(
				activeCore-6==x||
				activeCore+6==x||
				activeCore-1==x){
					return true;	
				}
			}
			return false;
		break;
		case 1://kolumna1
			if(activeCore<=6){
				if(
				activeCore+6==x||
				activeCore+1==x){
					return true;	
				}
			}
			if(activeCore>=19){
				if(
				activeCore-6==x||
				activeCore+1==x){
					return true;	
				}
			}
			if(activeCore>6&&activeCore<19){
				if(
				activeCore-6==x||
				activeCore+6==x||
				activeCore+1==x){
					return true;	
				}
			}
			return false;
		break;
		default:
			if(activeCore<=6){
				if(
				activeCore+6==x||
				activeCore-1==x||
				activeCore+1==x){
					return true;	
				}
			}
			if(activeCore>=19){
				if(
				activeCore-6==x||
				activeCore-1==x||
				activeCore+1==x){
					return true;	
				}
			}
			if(activeCore>6&&activeCore<19){
				if(
				activeCore-6==x||
				activeCore+6==x||
				activeCore-1==x||
				activeCore+1==x){
					return true;	
				}
			}
			return false;
		break;
	}//switch
}//sprawdzCzyKlocekJestAktywny

function klockiShuffle(){
	
	for(i=1;i<klockiImgPomieszane.length-1;i++){
		t=klockiImgPomieszane[i];
		r=Math.floor((Math.random()*23)+1);//nie miesza klocka w rogu na dole 
		klockiImgPomieszane[i]=klockiImgPomieszane[r];
		klockiImgPomieszane[r]=t;
		//klockiImgPomieszane[length-1]="Sofia00.png";
	}
}//klockiShuffle
		
function sprawdzKlocki(nowyKlocek){
	if(nowyKlocek!=klocekPoprzedni){
		switch(klockiOdsloniete){
		case 0:
			klockiOdsloniete++;
			minus1=nowyKlocek;
			break;
		case 1:
			klockiOdsloniete++;
			minus2=nowyKlocek;
			console.log(klockiImg[minus1]+" "+klockiImg[minus2]+" "+klockiCollected[minus1]+" "+klockiCollected[minus2]);
			if(klockiImg[minus1]==klockiImg[minus2]){
				klockiCollected[minus1]=1;
				klockiCollected[minus2]=1;
			}//if	
			break;
		case 2:
			klockiOdsloniete=0;
			minus1=0;
			minus2=0;
			klockiOdsloniete++;
			minus1=nowyKlocek;
			break;
		default:
			console.log("defult klockiOdsloniete: "+klockiOdsloniete);
			break;
		}//switch
	}
	klocekPoprzedni=nowyKlocek;
}//sprawdzKlocki

function zamienKlocki(n){
	t=klockiImgPomieszane[n];
	klockiImgPomieszane[n]=klockiImgPomieszane[activeCore];
	klockiImgPomieszane[activeCore]=t;
}//zamienKlocki

function sprawdzCzyUlozone(){
	if(
	klockiImgPomieszane[1]==klockiImgUlozone[1]&&
	klockiImgPomieszane[2]==klockiImgUlozone[2]&&
	klockiImgPomieszane[3]==klockiImgUlozone[3]&&
	klockiImgPomieszane[4]==klockiImgUlozone[4]&&
	klockiImgPomieszane[5]==klockiImgUlozone[5]&&
	klockiImgPomieszane[6]==klockiImgUlozone[6]&&
	klockiImgPomieszane[7]==klockiImgUlozone[7]&&
	klockiImgPomieszane[8]==klockiImgUlozone[8]&&
	klockiImgPomieszane[9]==klockiImgUlozone[9]&&
	klockiImgPomieszane[10]==klockiImgUlozone[10]&&
	klockiImgPomieszane[11]==klockiImgUlozone[11]&&
	klockiImgPomieszane[12]==klockiImgUlozone[12]&&
	klockiImgPomieszane[13]==klockiImgUlozone[13]&&
	klockiImgPomieszane[14]==klockiImgUlozone[14]&&
	klockiImgPomieszane[15]==klockiImgUlozone[15]&&
	klockiImgPomieszane[16]==klockiImgUlozone[16]&&
	klockiImgPomieszane[17]==klockiImgUlozone[17]&&
	klockiImgPomieszane[18]==klockiImgUlozone[18]&&
	klockiImgPomieszane[19]==klockiImgUlozone[19]&&
	klockiImgPomieszane[20]==klockiImgUlozone[20]&&
	klockiImgPomieszane[21]==klockiImgUlozone[21]&&
	klockiImgPomieszane[22]==klockiImgUlozone[22]&&
	klockiImgPomieszane[23]==klockiImgUlozone[23]&&
	klockiImgPomieszane[24]==klockiImgUlozone[24]
	){
		console.log("sprawdzCzyUlozone: "+true);
		return true;
	}else{
		console.log("sprawdzCzyUlozone: "+false);
		return false;
		}
}

function loadKlocki(){
		for(i=0;i<klockiCollected.length;i++){
			klockiCollected[i]=1;
		}
		klockiCollected[activeCore]=0;
	
	ramka=new Image();
	ramka.src="ramka.png";
	tlo='Sofia00.png';
	if(sprawdzCzyUlozone()){
		tlo='Sofia24.png';
		ramka.src="puste.png";
	}
	
	console.log("minus1: "+minus1+", minus2: "+minus2);
	c.clearRect(0,0,canvas.width,canvas.height);
	
	klocek1=new Image();
	if(klockiCollected[1]){klocek1.src=klockiImgPomieszane[1];}else{klocek1.src=tlo;}
	klocek1.onload=function(){
		c.drawImage(klocek1,0,0,100,100,R2K2.x,R2K2.y,R2K2.width,R2K2.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(1)){
			c.drawImage(ramka,R2K2.x,R2K2.y,R2K2.width,R2K2.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek2=new Image();
	if(klockiCollected[2]){klocek2.src=klockiImgPomieszane[2];}else{klocek2.src=tlo;};
	klocek2.onload=function(){
		c.drawImage(klocek2,0,0,100,100,R2K3.x,R2K3.y,R2K3.width,R2K3.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(2)){
			c.drawImage(ramka,R2K3.x,R2K3.y,R2K3.width,R2K3.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek3=new Image();
	if(klockiCollected[3]){klocek3.src=klockiImgPomieszane[3];}else{klocek3.src=tlo;};
	klocek3.onload=function(){
		c.drawImage(klocek3,0,0,100,100,R2K4.x,R2K4.y,R2K4.width,R2K4.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(3)){
			c.drawImage(ramka,R2K4.x,R2K4.y,R2K4.width,R2K4.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek4=new Image();
	if(klockiCollected[4]){klocek4.src=klockiImgPomieszane[4];}else{klocek4.src=tlo;};
	klocek4.onload=function(){
		c.drawImage(klocek4,0,0,100,100,R2K5.x,R2K5.y,R2K5.width,R2K5.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(4)){
			c.drawImage(ramka,R2K5.x,R2K5.y,R2K5.width,R2K5.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek5=new Image();
	if(klockiCollected[5]){klocek5.src=klockiImgPomieszane[5];}else{klocek5.src=tlo;};
	klocek5.onload=function(){
		c.drawImage(klocek5,0,0,100,100,R2K6.x,R2K6.y,R2K6.width,R2K6.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(5)){
			c.drawImage(ramka,R2K6.x,R2K6.y,R2K6.width,R2K6.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek6=new Image();
	if(klockiCollected[6]){klocek6.src=klockiImgPomieszane[6];}else{klocek6.src=tlo;};
	klocek6.onload=function(){
		c.drawImage(klocek6,0,0,100,100,R2K7.x,R2K7.y,R2K7.width,R2K7.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(6)){
			c.drawImage(ramka,R2K7.x,R2K7.y,R2K7.width,R2K7.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek7=new Image();
	if(klockiCollected[7]){klocek7.src=klockiImgPomieszane[7];}else{klocek7.src=tlo;};
	klocek7.onload=function(){
		c.drawImage(klocek7,0,0,100,100,R3K2.x,R3K2.y,R3K2.width,R3K2.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(7)){
			c.drawImage(ramka,R3K2.x,R3K2.y,R3K2.width,R3K2.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek8=new Image();
	if(klockiCollected[8]){klocek8.src=klockiImgPomieszane[8];}else{klocek8.src=tlo;};
	klocek8.onload=function(){
		c.drawImage(klocek8,0,0,100,100,R3K3.x,R3K3.y,R3K3.width,R3K3.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(8)){
			c.drawImage(ramka,R3K3.x,R3K3.y,R3K3.width,R3K3.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek9=new Image();
	if(klockiCollected[9]){klocek9.src=klockiImgPomieszane[9];}else{klocek9.src=tlo;};
	klocek9.onload=function(){
		c.drawImage(klocek9,0,0,100,100,R3K4.x,R3K4.y,R3K4.width,R3K4.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(9)){
			c.drawImage(ramka,R3K4.x,R3K4.y,R3K4.width,R3K4.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek10=new Image();
	if(klockiCollected[10]){klocek10.src=klockiImgPomieszane[10];}else{klocek10.src=tlo;};
	klocek10.onload=function(){
		c.drawImage(klocek10,0,0,100,100,R3K5.x,R3K5.y,R3K5.width,R3K5.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(10)){
			c.drawImage(ramka,R3K5.x,R3K5.y,R3K5.width,R3K5.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek11=new Image();
	if(klockiCollected[11]){klocek11.src=klockiImgPomieszane[11];}else{klocek11.src=tlo;};
	klocek11.onload=function(){
		c.drawImage(klocek11,0,0,100,100,R3K6.x,R3K6.y,R3K6.width,R3K6.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(11)){
			c.drawImage(ramka,R3K6.x,R3K6.y,R3K6.width,R3K6.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek12=new Image();
	if(klockiCollected[12]){klocek12.src=klockiImgPomieszane[12];}else{klocek12.src=tlo;};
	klocek12.onload=function(){
		c.drawImage(klocek12,0,0,100,100,R3K7.x,R3K7.y,R3K7.width,R3K7.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(12)){
			c.drawImage(ramka,R3K7.x,R3K7.y,R3K7.width,R3K7.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek13=new Image();
	if(klockiCollected[13]){klocek13.src=klockiImgPomieszane[13];}else{klocek13.src=tlo;};
	klocek13.onload=function(){
		c.drawImage(klocek13,0,0,100,100,R4K2.x,R4K2.y,R4K2.width,R4K2.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(13)){
			c.drawImage(ramka,R4K2.x,R4K2.y,R4K2.width,R4K2.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek14=new Image();
	if(klockiCollected[14]){klocek14.src=klockiImgPomieszane[14];}else{klocek14.src=tlo;};
	klocek14.onload=function(){
		c.drawImage(klocek14,0,0,100,100,R4K3.x,R4K3.y,R4K3.width,R4K3.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(14)){
			c.drawImage(ramka,R4K3.x,R4K3.y,R4K3.width,R4K3.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek15=new Image();
	if(klockiCollected[15]){klocek15.src=klockiImgPomieszane[15];}else{klocek15.src=tlo;};
	klocek15.onload=function(){
		c.drawImage(klocek15,0,0,100,100,R4K4.x,R4K4.y,R4K4.width,R4K4.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(15)){
			c.drawImage(ramka,R4K4.x,R4K4.y,R4K4.width,R4K4.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek16=new Image();
	if(klockiCollected[16]){klocek16.src=klockiImgPomieszane[16];}else{klocek16.src=tlo;};
	klocek16.onload=function(){
		c.drawImage(klocek16,0,0,100,100,R4K5.x,R4K5.y,R4K5.width,R4K5.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(16)){
			c.drawImage(ramka,R4K5.x,R4K5.y,R4K5.width,R4K5.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek17=new Image();
	if(klockiCollected[17]){klocek17.src=klockiImgPomieszane[17];}else{klocek17.src=tlo;};
	klocek17.onload=function(){
		c.drawImage(klocek17,0,0,100,100,R4K6.x,R4K6.y,R4K6.width,R4K6.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(17)){
			c.drawImage(ramka,R4K6.x,R4K6.y,R4K6.width,R4K6.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek18=new Image();
	if(klockiCollected[18]){klocek18.src=klockiImgPomieszane[18];}else{klocek18.src=tlo;};
	klocek18.onload=function(){
		c.drawImage(klocek18,0,0,100,100,R4K7.x,R4K7.y,R4K7.width,R4K7.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(18)){
			c.drawImage(ramka,R4K7.x,R4K7.y,R4K7.width,R4K7.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek19=new Image();
	if(klockiCollected[19]){klocek19.src=klockiImgPomieszane[19];}else{klocek19.src=tlo;};
	klocek19.onload=function(){
		c.drawImage(klocek19,0,0,100,100,R5K2.x,R5K2.y,R5K2.width,R5K2.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(19)){
			c.drawImage(ramka,R5K2.x,R5K2.y,R5K2.width,R5K2.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek20=new Image();
	if(klockiCollected[20]){klocek20.src=klockiImgPomieszane[20];}else{klocek20.src=tlo;};
	klocek20.onload=function(){
		c.drawImage(klocek20,0,0,100,100,R5K3.x,R5K3.y,R5K3.width,R5K3.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(20)){
			c.drawImage(ramka,R5K3.x,R5K3.y,R5K3.width,R5K3.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek21=new Image();
	if(klockiCollected[21]){klocek21.src=klockiImgPomieszane[21];}else{klocek21.src=tlo;};
	klocek21.onload=function(){
		c.drawImage(klocek21,0,0,100,100,R5K4.x,R5K4.y,R5K4.width,R5K4.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(21)){
			c.drawImage(ramka,R5K4.x,R5K4.y,R5K4.width,R5K4.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek22=new Image();
	if(klockiCollected[22]){klocek22.src=klockiImgPomieszane[22];}else{klocek22.src=tlo;};
	klocek22.onload=function(){
		c.drawImage(klocek22,0,0,100,100,R5K5.x,R5K5.y,R5K5.width,R5K5.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(22)){
			c.drawImage(ramka,R5K5.x,R5K5.y,R5K5.width,R5K5.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek23=new Image();
	if(klockiCollected[23]){klocek23.src=klockiImgPomieszane[23];}else{klocek23.src=tlo;};
	klocek23.onload=function(){
		c.drawImage(klocek23,0,0,100,100,R5K6.x,R5K6.y,R5K6.width,R5K6.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(23)){
			c.drawImage(ramka,R5K6.x,R5K6.y,R5K6.width,R5K6.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}
	klocek24=new Image();
	if(klockiCollected[24]){klocek24.src=klockiImgPomieszane[24];}else{klocek24.src=tlo;};
	klocek24.onload=function(){
		c.drawImage(klocek24,0,0,100,100,R5K7.x,R5K7.y,R5K7.width,R5K7.height);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(24)){
			c.drawImage(ramka,R5K7.x,R5K7.y,R5K7.width,R5K7.height);
		}
	//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
	}		
}//ladujKlocki	

function init(id){
	menu="pudelko";
	canvas = document.createElement("canvas");  //to jest canvas wiszacy w nicosci, trzeba go dopiero appendowac do czegos
	if(id!=""){
		document.getElementById(id).appendChild(canvas);
	}else{
		document.body.appendChild(canvas);
	}
	//canvas = document.getElementById("game");
	canvas.width=600;
	canvas.height=800;
	c=canvas.getContext("2d");
	c.clearRect(0,0,canvas.width,canvas.height);
	
	//Binding the click event on the canvas
canvas.addEventListener('mouseup', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	klocek=0;
	
//memo
	if (menu=="pudelko"&&isInside(mousePos,R2K2)) {
		klocek=1;
		console.log(mousePos.x+" "+mousePos.y+" "+menu);

		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)+" klinkieto klocek R2K2 - 1");
		sprawdzKlocki(klocek);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek;loadKlocki();}
		/*klocek=new Image();
		klocek.src='icon7.png';
		klocek.onload=function(){
			c.drawImage(klocek,R2K2.x,R2K2.y,R2K2.width,R2K2.height);
		//Tekst(zasobyZakladka1[1]+"/10",130,200,"#111111");
		}*/
	}
	if (menu=="pudelko"&&isInside(mousePos,R2K3)) {
		klocek=2;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R2K3 - 2");
		sprawdzKlocki(2);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R2K4)) {
		klocek=3;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R2K4 - 3");
		sprawdzKlocki(3);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R2K5)) {
		klocek=4;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R2K5 - 4");
		sprawdzKlocki(4);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R2K6)) {
		klocek=5;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R2K6 - 5");
		sprawdzKlocki(5);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R2K7)) {
		klocek=6;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R2K7 - 6");
		sprawdzKlocki(6);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R3K2)) {
		klocek=7;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R3K2 - 7");
		sprawdzKlocki(7);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R3K3)) {
		klocek=8;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R3K - 8");
		sprawdzKlocki(8);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R3K4)) {
		klocek=9;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R3K4 - 9");
		sprawdzKlocki(9);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R3K5)) {
		klocek=10;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R3K5 - 10");
		sprawdzKlocki(10);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R3K6)) {
		klocek=11;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R3K6 - 11");
		sprawdzKlocki(11);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R3K7)) {
		klocek=12;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R3K7 - 12");
		sprawdzKlocki(12);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R4K2)) {
		klocek=13;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R4K2 - 13");
		sprawdzKlocki(13);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R4K3)) {
		klocek=14;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R4K3 - 14");
		sprawdzKlocki(14);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R4K4)) {
		klocek=15;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R4K4 - 15");
		sprawdzKlocki(15);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R4K5)) {
		klocek=16;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R4K5 - 16");
		sprawdzKlocki(16);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R4K6)) {
		klocek=17;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R4K6 - 17");
		sprawdzKlocki(17);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R4K7)) {
		klocek=18;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R4K7 - 18");
		sprawdzKlocki(18);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R5K2)) {
		klocek=19;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R5K2 - 19");
		sprawdzKlocki(19);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R5K3)) {
		klocek=20;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R5K3 - 20");
		sprawdzKlocki(20);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R5K4)) {
		klocek=21;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R5K4 - 21");
		sprawdzKlocki(21);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R5K5)) {
		klocek=22;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R5K5 - 22");
		sprawdzKlocki(22);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R5K6)) {
		klocek=23;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R5K6 - 23");
		sprawdzKlocki(23);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if (menu=="pudelko"&&isInside(mousePos,R5K7)) {
		klocek=24;
		//document.getElementById("test").innerHTML+="Kliknięto icon1 - lista";
		//c.clearRect(0,0,canvas.width,canvas.height);
		//rysuj calsc jak jest, tylko podmien dany klocek
		//console.log("czy klocek aktywny: "+if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek))+" klinkieto klocek R5K7 - 24");
		sprawdzKlocki(24);
		if(!sprawdzCzyUlozone()&&sprawdzCzyKlocekJestAktywny(klocek)){zamienKlocki(klocek);activeCore=klocek; loadKlocki();}
	}
	if(sprawdzCzyKlocekJestAktywny(klocek)){
		activeCore=klocek;
	}
	
//koniec memo

}, false);


}//init

//Function to get the mouse position
function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
	return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}
	
function graKlockiSofii(id){
	init(id);
	klockiShuffle();
	loadKlocki();
}//graMemory

//rzad y kolumna x
//rzad1
R1K1={ //r-kolumna, k - rzad
	y:0,
	x:0,
	width:100,
	height:100			
}
R1K2={
	x:0,
	y:100,
	width:100,
	height:100			
}
R1K3={
	x:0,
	y:200,
	width:100,
	height:100			
}
R1K4={
	x:0,
	y:300,
	width:100,
	height:100			
}
R1K5={
	x:0,
	y:400,
	width:100,
	height:100			
}
R1K6={
	x:0,
	y:500,
	width:100,
	height:100			
}
R1K7={
	x:0,
	y:600,
	width:100,
	height:100			
}
R1K8={
	x:0,
	y:700,
	width:100,
	height:100			
}
//rzad2
R2K1={
	x:100,
	y:0,
	width:100,
	height:100			
}
R2K2={
	x:100,
	y:100,
	width:100,
	height:100			
}
R2K3={
	x:100,
	y:200,
	width:100,
	height:100			
}
R2K4={
	x:100,
	y:300,
	width:100,
	height:100			
}
R2K5={
	x:100,
	y:400,
	width:100,
	height:100			
}
R2K6={
	x:100,
	y:500,
	width:100,
	height:100			
}
R2K7={
	x:100,
	y:600,
	width:100,
	height:100			
}
R2K8={
	x:100,
	y:700,
	width:100,
	height:100			
}
//yzad3
R3K1={
	x:200,
	y:0,
	width:100,
	height:100			
}
R3K2={
	x:200,
	y:100,
	width:100,
	height:100			
}
R3K3={
	x:200,
	y:200,
	width:100,
	height:100			
}
R3K4={
	x:200,
	y:300,
	width:100,
	height:100			
}
R3K5={
	x:200,
	y:400,
	width:100,
	height:100			
}
R3K6={
	x:200,
	y:500,
	width:100,
	height:100			
}
R3K7={
	x:200,
	y:600,
	width:100,
	height:100			
}
R3K8={
	x:200,
	y:700,
	width:100,
	height:100			
}
//yzad 4
R4K1={
	x:300,
	y:0,
	width:100,
	height:100			
}
R4K2={
	x:300,
	y:100,
	width:100,
	height:100			
}
R4K3={
	x:300,
	y:200,
	width:100,
	height:100			
}
R4K4={
	x:300,
	y:300,
	width:100,
	height:100			
}
R4K5={
	x:300,
	y:400,
	width:100,
	height:100			
}
R4K6={
	x:300,
	y:500,
	width:100,
	height:100			
}
R4K7={
	x:300,
	y:600,
	width:100,
	height:100			
}
R4K8={
	x:300,
	y:700,
	width:100,
	height:100			
}
//yzad 5
R5K1={
	x:400,
	y:0,
	width:100,
	height:100			
}
R5K2={
	x:400,
	y:100,
	width:100,
	height:100			
}
R5K3={
	x:400,
	y:200,
	width:100,
	height:100			
}
R5K4={
	x:400,
	y:300,
	width:100,
	height:100			
}
R5K5={
	x:400,
	y:400,
	width:100,
	height:100			
}
R5K6={
	x:400,
	y:500,
	width:100,
	height:100			
}
R5K7={
	x:400,
	y:600,
	width:100,
	height:100			
}
R5K8={
	x:400,
	y:700,
	width:100,
	height:100			
}

//yzad 6
R6K1={
	x:500,
	y:0,
	width:100,
	height:100			
}
R6K2={
	x:500,
	y:100,
	width:100,
	height:100			
}
R6K3={
	x:500,
	y:200,
	width:100,
	height:100			
}
R6K4={
	x:500,
	y:300,
	width:100,
	height:100			
}
R6K5={
	x:500,
	y:400,
	width:100,
	height:100			
}
R6K6={
	x:500,
	y:500,
	width:100,
	height:100			
}
R6K7={
	x:500,
	y:600,
	width:100,
	height:100			
}
R6K8={
	x:500,
	y:700,
	width:100,
	height:100			
}


wspKlockow=[
	[0,0,0,0],
	[R2K2.x,R2K2.y,R2K2.width,R2K2.height],
	[R2K3.x,R2K3.y,R2K3.width,R2K3.height],
	[R2K4.x,R2K4.y,R2K4.width,R2K4.height],
	[R2K5.x,R2K5.y,R2K5.width,R2K5.height],
	[R2K6.x,R2K6.y,R2K6.width,R2K6.height],
	[R2K7.x,R2K7.y,R2K7.width,R2K7.height],
[R3K2.x,R3K2.y,R3K2.width,R3K2.height],
	[R3K3.x,R3K3.y,R3K3.width,R3K3.height],
	[R3K4.x,R3K4.y,R3K4.width,R3K4.height],
	[R3K5.x,R3K5.y,R3K5.width,R3K5.height],
	[R3K6.x,R3K6.y,R3K6.width,R3K6.height],
	[R3K7.x,R3K7.y,R3K7.width,R3K7.height],
[R4K2.x,R4K2.y,R4K2.width,R4K2.height],
	[R4K3.x,R4K3.y,R4K3.width,R4K3.height],
	[R4K4.x,R4K4.y,R4K4.width,R4K4.height],
	[R4K5.x,R4K5.y,R4K5.width,R4K5.height],
	[R4K6.x,R4K6.y,R4K6.width,R4K6.height],
	[R4K7.x,R4K7.y,R4K7.width,R4K7.height],
[R5K2.x,R5K2.y,R5K2.width,R5K2.height],
	[R5K3.x,R5K3.y,R5K3.width,R5K3.height],
	[R5K4.x,R5K4.y,R5K4.width,R5K4.height],
	[R5K5.x,R5K5.y,R5K5.width,R5K5.height],
	[R5K6.x,R5K6.y,R5K6.width,R5K6.height],
	[R5K7.x,R5K7.y,R5K7.width,R5K7.height],
];