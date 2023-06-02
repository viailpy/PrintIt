let slides =
{
	Dots : document.querySelector('.dots'),
	Arrow : document.querySelectorAll('.arrow'),
	BannerImg : document.querySelector('.banner-img'),
	ImgBasePath : "./assets/images/slideshow/",
	BannerTxt : document.querySelector('#banner').getElementsByTagName('p')[0],
	Left : "arrow_left",
	Right : "arrow_right",
	CurrentPosition : 0,
	SlidesList : [
		{
			"image":"slide1.jpg",
			"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
		},
		{
			"image":"slide2.jpg",
			"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
		},
		{
			"image":"slide3.jpg",
			"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
		},
		{
			"image":"slide4.png",
			"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
		}
	],

	"init" : () =>
	{
		const Arrow = slides.Arrow;

		for(let i = 0; i < Arrow.length; i++)
		{
			Arrow[i].addEventListener('click', (e) => {
				const Elm = e.currentTarget;
				const ElmClass = Elm.className.split(' ');

				slides.mouveSlide(ElmClass[1]);
			})
		}

		const DotsLength = slides.Dots.childElementCount;
		const Dots = slides.Dots;
		for(let i= 0; i < DotsLength; i++)
		{
			    Dots.children[i].addEventListener('click', (e) => {
				slides.setCurrentDot(Dots.children[i].getAttribute('data-index') );
				slides.updateContent(Dots.children[i].getAttribute('data-index') );
			})
		}
	
	},
	"mouveSlide" : (ArrowDirection) =>
	{
		const Dots = slides.Dots;
		const DotsChildCount = Dots.childElementCount;
		let PlusOuMoins = slides.CurrentPosition+1;

		
		if(ArrowDirection === slides.Left)
			PlusOuMoins = slides.CurrentPosition-1;


		if(Dots.children[PlusOuMoins] !== undefined )
			slides.CurrentPosition = PlusOuMoins;
		else
		{
			if(slides.CurrentPosition === (DotsChildCount - 1) )
				slides.CurrentPosition = 0;
			else
				slides.CurrentPosition = DotsChildCount-1;
		}

		slides.setCurrentDot(slides.CurrentPosition);
		slides.updateContent(slides.CurrentPosition);
	},
	"setCurrentDot" : (NewPosition) => 
	{
		slides.removeDotSelected();
		const CurrentDot = slides.Dots.children[NewPosition];
		CurrentDot.className = "dot dot_selected";
	},
	"updateContent" : (NewPosition) =>
	{
		slides.BannerImg.src = slides.ImgBasePath+slides.SlidesList[NewPosition].image;
	    slides.BannerTxt.innerHTML = slides.SlidesList[NewPosition].tagLine;
	},
	"removeDotSelected" : () =>
	{
		//Pour mettre toutes les classes des points en "dot" uniquement
		Array.from(slides.Dots.children).forEach(Dot => {
			Dot.className = "dot";
		});
	}
}

slides.init();


