/* eslint-disable */
import './style.css';

let map, popup;

const makePopupClass = (google) => {
    return class Popup extends google.maps.OverlayView {
        position;
        containerDiv;
        constructor(position, content) {
            super();
            this.position = position;
            content.classList.add("popup-bubble");

            // This zero-height div is positioned at the bottom of the bubble.
            const bubbleAnchor = document.createElement("div");

            bubbleAnchor.classList.add("popup-bubble-anchor");
            bubbleAnchor.appendChild(content);
            // This zero-height div is positioned at the bottom of the tip.
            this.containerDiv = document.createElement("div");
            this.containerDiv.classList.add("popup-container");
            this.containerDiv.appendChild(bubbleAnchor);
            // Optionally stop clicks, etc., from bubbling up to the map.
            Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
        }
        /** Called when the popup is added to the map. */
        onAdd() {
            this.getPanes().floatPane.appendChild(this.containerDiv);
        }
        /** Called when the popup is removed from the map. */
        onRemove() {
            if (this.containerDiv.parentElement) {
                this.containerDiv.parentElement.removeChild(this.containerDiv);
            }
        }
        /** Called each frame when the popup needs to draw itself. */
        draw() {
            const divPosition = this.getProjection().fromLatLngToDivPixel(
                this.position
            );
            // Hide the popup when it is far out of view.
            const display =
                Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                    "block" :
                    "none";

            if (display === "block") {
                this.containerDiv.style.left = divPosition.x + "px";
                this.containerDiv.style.top = divPosition.y + "px";
            }

            if (this.containerDiv.style.display !== display) {
                this.containerDiv.style.display = display;
            }
        }
    }
};


export const addPopup = ({ Popup, text, cords }) => {
    const doc = document.createElement('div');
    doc.innerText = text;

    const popup = new Popup(
        new google.maps.LatLng(...cords),
        doc
    );
    popup.setMap(map);

    return () => {
        doc.remove();
    };
};

export const addPopups = () => {

};


/** Initializes the map and the custom popup. */
// export const initMap = () => {
//     console.log(window.google);

//     map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: 55.751244, lng: 37.618423 },
//         zoom: 3,
//     });

//     const Popup = makePopupClass(google);

//     addPopup({ Popup, text: 'test', cords: [-33.866, 151.196] });
//     addPopup({ Popup, text: 'goga', cords: [-36.866, 151.196] });
// }

// export const initMap = () => {
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 12,
//         center: { lat: 34.84555, lng: -111.8035 },
//     });
//     // Set LatLng and title text for the markers. The first marker (Boynton Pass)
//     // receives the initial focus when tab is pressed. Use arrow keys to
//     // move between markers; press tab again to cycle through the map controls.
//     const tourStops = [
//         [{ lat: 34.8791806, lng: -111.8265049 }, "Boynton Pass "],
//         [{ lat: 34.8559195, lng: -111.7988186 }, "Airport Mesa"],
//         [{ lat: 34.832149, lng: -111.7695277 }, "Chapel of the Holy Cross"],
//         [{ lat: 34.823736, lng: -111.8001857 }, "Red Rock Crossing"],
//         [{ lat: 34.800326, lng: -111.7665047 }, "Bell Rock"],
//     ];
//     // Create an info window to share between markers.
//     const infoWindow = new google.maps.InfoWindow();

//     // Create the markers.
//     tourStops.forEach(([position, title], i) => {
//         const marker = new google.maps.Marker({
//             position,
//             map,
//             title: `${i + 1000}. ${title}`,
//             label: `${i + 1000}`,
//             optimized: true,
//         });

//         // Add a click listener for each marker, and set up the info window.
//         marker.addListener("click", () => {
//             infoWindow.close();
//             infoWindow.setContent(marker.getTitle());
//             infoWindow.open(marker.getMap(), marker);
//         });
//     });

//     return (data) => {
//         data.forEach(({ coordinates, city }) => {
//             const { latitude: lat, longitude: lng } = coordinates;
//         });

//     };
// }

export const initMap = () => {
    const russia = { lat: 55.751244, lng: 37.618423 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: russia,
    });

    return (data) => {
        data.forEach(({ coordinates, city, vacancies, resumes }) => {
            console.log(coordinates)
            const { latitude, longitude } = coordinates;

            const contentString = `
                <div id="content">
                    <div id="siteNotice"></div>
                    <h1 id="firstHeading" class="firstHeading">${city}</h1>

                    <div id="bodyContent">
                        <p><strong>Vacancies - ${vacancies.count}</strong></p>
                        <p>Mean: ${vacancies.mean_from.toFixed(0)} - ${vacancies.mean_to.toFixed(0)}</p>
                        <p>Median: ${vacancies.median_from.toFixed(0)} - ${vacancies.median_to.toFixed(0)}</p>

                        <p><strong>Resumes - ${resumes.count}</strong></p>
                        <p>Mean: ${resumes.mean_from.toFixed(0)} - ${resumes.mean_to.toFixed(0)}</p>
                        <p>Median: ${resumes.median_from.toFixed(0)} - ${resumes.median_to.toFixed(0)}</p>
                    </div>
                </div>`;

            const infowindow = new google.maps.InfoWindow({
                content: contentString,
            });

            const marker = new google.maps.Marker({
                position: {lat: Number(latitude), lng: Number(longitude)},
                map,
                animation: google.maps.Animation.DROP,
                title: "Uluru (Ayers Rock)",
                label: `${city} - ${resumes.count} / ${vacancies.count}`
            });

            marker.addListener("click", () => {
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: true,
                });
            });
        });

    };
}

//////

// export const initMap = () => {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 10,
//       center: { lat: -33.9, lng: 151.2 },
//     });

//     setMarkers(map);
//   }

//   // Data for the markers consisting of a name, a LatLng and a zIndex for the
//   // order in which these markers should display on top of each other.
//   const beaches = [
//     ["Bondi Beach", -33.890542, 151.274856, 4],
//     ["Coogee Beach", -33.923036, 151.259052, 5],
//     ["Cronulla Beach", -34.028249, 151.157507, 3],
//     ["Manly Beach", -33.80010128657071, 151.28747820854187, 2],
//     ["Maroubra Beach", -33.950198, 151.259302, 1],
//   ];

//   function setMarkers(map) {
//     // Adds markers to the map.
//     // Marker sizes are expressed as a Size of X,Y where the origin of the image
//     // (0,0) is located in the top left of the image.
//     // Origins, anchor positions and coordinates of the marker increase in the X
//     // direction to the right and in the Y direction down.
//     const image = {
//       url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
//       // This marker is 20 pixels wide by 32 pixels high.
//       size: new google.maps.Size(20, 32),
//       // The origin for this image is (0, 0).
//       origin: new google.maps.Point(0, 0),
//       // The anchor for this image is the base of the flagpole at (0, 32).
//       anchor: new google.maps.Point(0, 32),
//     };
//     // Shapes define the clickable region of the icon. The type defines an HTML
//     // <area> element 'poly' which traces out a polygon as a series of X,Y points.
//     // The final coordinate closes the poly by connecting to the first coordinate.
//     const shape = {
//       coords: [1, 1, 1, 20, 18, 20, 18, 1],
//       type: "poly",
//     };

//     for (let i = 0; i < beaches.length; i++) {
//       const beach = beaches[i];

//       new google.maps.Marker({
//         position: { lat: beach[1], lng: beach[2] },
//         map,
//         icon: image,
//         shape: shape,
//         title: beach[0],
//         zIndex: beach[3],
//       });
//     }
//   }