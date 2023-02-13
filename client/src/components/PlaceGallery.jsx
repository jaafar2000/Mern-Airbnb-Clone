import React,{useState} from 'react'

const PlaceGallery = ({place}) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className=" absolute inset-0 bg-black min-h-screen ">
        <div className="p-8 bg-black grid gap-4">
          <div>
            <h2 className="text-3xl  text-white ">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className=" fixed flex right-12 top-8 items-center gap-2 text-black shadow-md  bg-white rounded-xl p-2"
            >
              Close photos <AiOutlineCloseCircle />
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden ">
      <div>
        {place?.photos?.[0] && (
          <div>
            <img
              className="aspect-square object-cover"
              src={"http://localhost:4000/uploads/" + place?.photos[0]}
              alt=""
            />
          </div>
        )}
      </div>
      <div className=" grid">
        {place?.photos?.[1] && (
          <img
            className="aspect-square object-cover"
            src={"http://localhost:4000/uploads/" + place?.photos[1]}
            alt=""
          />
        )}
        {place?.photos?.[2] && (
          <div className="overflow-hidden">
            <img
              className="aspect-square object-cover relative top-2 "
              src={"http://localhost:4000/uploads/" + place?.photos[2]}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
    <button
      onClick={() => setShowAllPhotos(true)}
      className=" absolute bottom-2  right-2 py-2 px-4 bg-white rounded-2xl shadow-gray-500 "
    >
      show more photo
      {showAllPhotos}
    </button>
  </div>  )
}

export default PlaceGallery