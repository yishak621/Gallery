//GET-ELMENT function
function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(`yo check the ${selection} is correctly typed`);
}
//CONSTRUCTOR FUNCTION
class Gallery {
  constructor(element) {
    // this.list = element.querySelectorAll('.img'); it is okay to get a node list but we want tho have an array do we use ES6 syntax
    this.container = element;
    this.list = [...element.querySelectorAll('.img')];

    //Target
    this.modal = getElement('.modal'); //parent container
    this.modalImg = getElement('.main-img'); //main-img
    this.imageName = getElement('.image-name');
    this.modalImages = getElement('.modal-images'); //parent for small images
    this.closeBtn = getElement('.close-btn');
    this.nextBtn = getElement('.next-btn');
    this.prevBtn = getElement('.prev-btn');
    //bind fucntions
    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.clickImage = this.clickImage.bind(this);
    //[1] we can assign 'this' to variable and to reffer it alwasy to container
    //let self = this;

    //[2]since we bind it below it is optional=> this.openModal = this.openModal.bind(this);
    //always remember to bind this to our constructor function since this always refers to the left of it
    //container event
    this.container.addEventListener(
      'click',
      function (e) {
        // console.log(this);
        //this.openModal(); so again 'this' refers to the container not to gallery so we bind it to gallery
        //[2]self.openModal();optional variable
        if (e.target.classList.contains('img')) {
          this.openModal(e.target, this.list);
        }
      }.bind(this)
    );
  }
  //OPEN MODAL
  //remember we have array of images>list
  openModal = function (selectedImage, list) {
    this.setMainImage(selectedImage);
    this.modalImages.innerHTML = list
      .map(function (image) {
        return `<img src="${
          image.src //the main logic here is to place modal images under the main image by thier own lists catagory and by comparing there dataset id we can change there classes as 'selected' or not
        }" title="${image.title}" data-id="${image.dataset.id}" class="${selectedImage.dataset.id === image.dataset.id ? 'modal-img selected' : 'modal-img'}"/>`;
      })
      .join(''); //in the above we compare the dataset id of the selectedImage and the image[modal image] then if it matches the selected class will be added
    //the .join("") is very important since we want all the result of new array to be ONE STRING(avoiding commas)

    this.modal.classList.add('open');
    //event listner
    this.closeBtn.addEventListener('click', this.closeModal);
    this.nextBtn.addEventListener('click', this.nextImage);
    this.prevBtn.addEventListener('click', this.prevImage);
    this.modalImages.addEventListener('click', this.clickImage);
  };
  //MAIN IMAGE
  setMainImage = function (selectedImage) {
    this.modalImg.src = selectedImage.src; //main image
    this.imageName.textContent = selectedImage.title;
  };
  //CLOSE MODAL <!--TODO: this is must
  //the logic for close modal is after we click on close button we want to remove the event listner for that specific instant too
  closeModal = function () {
    this.modal.classList.remove('open');
    this.closeBtn.removeEventListener('click', this.closeModal);
    this.nextBtn.removeEventListener('click', this.nextImage);
    this.prevBtn.removeEventListener('click', this.prevImage);
    this.modalImages.removeEventListener('click', this.clickImage);
  };
  //next image
  nextImage = function () {
    const selected = this.modalImages.querySelector('.selected');
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove('selected');
    next.classList.add('selected');
    this.setMainImage(next);
  };
  prevImage = function () {
    const selected = this.modalImages.querySelector('.selected');
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove('selected');
    prev.classList.add('selected');
    this.setMainImage(prev);
  };
  //click image--when we click on modal preview images
  clickImage = function (e) {
    if (e.target.classList.contains('modal-img')) {
      const selected = this.modalImages.querySelector('.selected');
      selected.classList.remove('selected');

      this.setMainImage(e.target);
      e.target.classList.add('selected');
    }
  };
}

//INVOKING
const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));
