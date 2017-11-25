    var self = this;

	self.on("updated", function(){
		if(isUndefined(self.tags.overlay)) return;
		if(!self.isFirstOpen) return;
		var gearImageFrame = self.tags.overlay.refs.gear_full_image.root;
		initImageTranslateState(gearImageFrame.children[0]);

		// 最後に実行した時間
		var intervalTime = Device.Ua.isAndroid ? 100 : 0;
		var lastTime = new Date().getTime() - intervalTime;
		var gearImage = gearImageFrame.children[0];
		initImageTranslateState(gearImage);
		gearImageFrame.addEventListener(typeDown, function (event) {setTouchPosition(event)});
		gearImageFrame.addEventListener(typeUp, function (event) {setImageTransformPosition(event)});
		gearImageFrame.addEventListener(typeMove, function (event) {
			if ((lastTime + intervalTime) <= new Date().getTime()) {
				lastTime = new Date().getTime();
				imageTransform(event);
			}
		});
		var buttonSlider = self.tags.overlay.refs.button_slider;
		self.sliderPosition = 0;
		buttonSlider.addEventListener(typeDown, function(event){initImageTransformScale(event)});
		buttonSlider.addEventListener(typeUp, function(event){setImageTransformScale(event)});
		buttonSlider.addEventListener(typeMove, function(event){moveImageTransformScale(event)});
	});

	// ギアの全画面表示ボタンを押したとき
	self.fullSizeGear = function(e){
		e.preventUpdate = true;
		self.isFullSizeGear = !self.isFullSizeGear;
		self.buttonSliderInitPosition = 65;
		var sliderButton = self.tags.overlay.refs.button_slider;
		sliderButton.style.left = self.buttonSliderInitPosition + "px";

		var gearImageFrame = self.tags.overlay.refs.gear_full_image.root;
		var gearImage = gearImageFrame.children[0];
		if(!self.isFullSizeGear) {
			gearImage.style["transform"] = "";
		}
		initImageTranslateState(gearImage);

		SoundBase.playCommonSe(4);
		self.update();
	};

	// ギア画像の移動を行うための処理
	function imageTransform(e){
		if(!self.isFullSizeGear) return;
		var gearImageFrame = self.tags.overlay.refs.gear_full_image.root;
		var gearImage = gearImageFrame.children[0];

		// 移動距離を計算
		var moveX = self.imageTransformState.translateX + (e.touches[0].pageX - self.imageTransformState.initPositionX);
		var moveY = self.imageTransformState.translateY + (e.touches[0].pageY - self.imageTransformState.initPositionY);

		var translate = checkTranslateLimit(moveX, moveY);

		gearImage.style["transform"] = "translate(" + translate.x + "px," + translate.y + "px) scale(" + self.imageTransformState.scale + ")";
	}

	// 指をおいたときの初期位置を記録する
	function setTouchPosition(e){
		if(e.touches.length === 1){
			self.imageTransformState.initPositionX = e.touches[0].pageX;
			self.imageTransformState.initPositionY = e.touches[0].pageY;
		}
	}

	// 指を離したときの移動位置を記録する
	function setImageTransformPosition(e){
		var gearImageFrame = self.tags.overlay.refs.gear_full_image.root;
		var gearImage = gearImageFrame.children[0];
		var transformMatrix = new WebKitCSSMatrix(getComputedStyle(gearImage).transform);
		self.imageTransformState.translateX = transformMatrix.e;
		self.imageTransformState.translateY = transformMatrix.f;
	}

	function initImageTransformScale(e){
		// 触った位置の座標を取る
		self.sliderPosition = e.touches[0].pageX;
	}

	function moveImageTransformScale(e){
		var gaugeMax = 115;
		var gaugeMin = 0;
		var sliderButton = self.tags.overlay.refs.button_slider;
		// 移動量の測定
		var translateValue = self.sliderPosition - e.touches[0].pageX;
		// 触った位置の座標を取る
		var currentSliderPosition = self.sliderTranslatePosition = sliderButton.style.left.slice(0, -2) - 0;
		// スライダーボタンを移動
		if(currentSliderPosition - translateValue >= gaugeMax) {
			currentSliderPosition = gaugeMax;
			translateValue = self.sliderTranslatePosition - gaugeMax;
		}else if(currentSliderPosition - translateValue <= gaugeMin) {
			currentSliderPosition = gaugeMin;
			translateValue = self.sliderTranslatePosition;
		}else {
			currentSliderPosition -= translateValue;
		}
		sliderButton.style["transform"] = "translateX(" + -translateValue + "px)";
		self.imageTransformState.scale = currentSliderPosition / 100 + 0.5;
		self.sliderTranslatePosition = currentSliderPosition;
		// スライダーボタンの位置に合わせて画像の倍率を変化させる
		var gearImageFrame = self.tags.overlay.refs.gear_full_image.root;
		var gearImage = gearImageFrame.children[0];

		var translate = checkTranslateLimit(self.imageTransformState.translateX, self.imageTransformState.translateY);
		gearImage.style["transform"] = "translate(" + translate.x + "px," + translate.y + "px) scale(" + self.imageTransformState.scale + ")";
	}

	function setImageTransformScale() {
		var sliderButton = self.tags.overlay.refs.button_slider;
		sliderButton.style.left = self.sliderTranslatePosition + "px";
		sliderButton.style["transform"] = "";

		var gearImageFrame = self.tags.overlay.refs.gear_full_image.root;
		var gearImage = gearImageFrame.children[0];
		var transformMatrix = new WebKitCSSMatrix(getComputedStyle(gearImage).transform);
		self.imageTransformState.translateX = transformMatrix.e;
		self.imageTransformState.translateY = transformMatrix.f;
	}

	function initImageTranslateState(gearImage){
		self.imageTransformState = {
			initPositionX: 0,
			initPositionY: 0,
			imageArea: {base: null, current: 0},
			translateX: 0,
			translateY: 0,
			baseLeftPosition: gearImage.style.left.slice(0, -2) - 0,
			baseTopPosition: gearImage.style.top.slice(0, -2) - 0,
			scale: 1
		};
	}

	function checkTranslateLimit (x, y){
		var positionScale = 2 - self.imageTransformState.scale;
		var limit = {
			bottom: -self.imageTransformState.baseTopPosition * positionScale - (700 * self.imageTransformState.scale - 569),
			top: -self.imageTransformState.baseTopPosition * self.imageTransformState.scale,
			left: ((-self.imageTransformState.baseLeftPosition + 320) - 700 * self.imageTransformState.scale)*positionScale,
			right: -self.imageTransformState.baseLeftPosition * self.imageTransformState.scale
		};
		//            var limit = {
		//                bottom: -self.imageTransformState.baseTopPosition - (700 * self.imageTransformState.scale - 569),
		//                top: -self.imageTransformState.baseTopPosition,
		//                left: -self.imageTransformState.baseLeftPosition - (700 * self.imageTransformState.scale - 320),
		//                right: -self.imageTransformState.baseLeftPosition
		//            };

		console.log(limit);
		console.log(positionScale + " : " + self.imageTransformState.scale);
		if(700 * self.imageTransformState.scale <= 569) {
			y = (569 - 700 * self.imageTransformState.scale) / 2 + self.imageTransformState.baseTopPosition;
			if(700 * self.imageTransformState.scale <= 350){
				x = (320 - 700 * self.imageTransformState.scale) / 2;
			}else{
				if (x >= limit.right)
					x = limit.right;
				else if (x <= limit.left)
					x = limit.left;
			}
		} else {
			if (x >= limit.right)
				x = limit.right;
			else if (x <= limit.left)
				x = limit.left;

			if (y >= limit.top)
				y = limit.top;
			else if (y <= limit.bottom)
				y = limit.bottom;
		}
		return {x : x, y: y};
	}



