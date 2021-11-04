const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarUpload = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoHomePreview = document.querySelector('.ad-form__photo');
const photoHomeUpload = document.querySelector('.ad-form__upload input[type="file"]');


avatarUpload.addEventListener('change', () => {
  const file = avatarUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

const resetAvatarImg = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
};

photoHomeUpload.addEventListener('change', () => {
  const file = photoHomeUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const photo = document.createElement('img');
  photo.width = '70';
  photo.height = '70';
  photo.alt = 'Фотография жилья';
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      photo.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
  photoHomePreview.appendChild(photo);
});

const resetPhotoHome = () => {
  photoHomePreview.innerHTML = '';
};

export {resetAvatarImg, resetPhotoHome};
