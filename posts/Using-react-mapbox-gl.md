---
title: 'Create a custom interactive map'
date: 'September, 14, 2022'
excerpt: 'This will show you how to use react-map-gl'
cover_image: '/images/posts/img7.jpg'
category: 'Utilities'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# MapBox
## use react-map-gl package by uber
**In your index(Next)/ App(react) file put the following code**
_import 'mapbox-gl/dist/mapbox-gl.css'_

# Important
### Your env variables must be as follows:
*I found the most success directly linking the variable and not using config file*

```javascript
react: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
next: process.env.NEXT_PUBLIC_MAPBOX_TOKEN
```

```javascript
import * as React from 'react';
import Map, { Marker, Popup, FullscreenControl } from 'react-map-gl';
import moment from 'moment';
import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

import 'mapbox-gl/dist/mapbox-gl.css';
// Pasted Styles from mapbox into index

export default function NewMapBoxMap({ allEvents }) {
    console.log({ mapevents: allEvents });
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    const [uselessState, setUselessState] = React.useState(false);
    const [futureEvents, setFutureEvents] = React.useState([...allEvents])

    let splicedDate = !selectedEvent ? null : selectedEvent.date.split('T')[0];

    let theDateNumber = moment(splicedDate).day()
    let dayOfTheWeek = moment(splicedDate).day(theDateNumber)
    let formatedDate = dayOfTheWeek.format('dddd, MMMM Do YYYY')

    React.useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedEvent(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <>

            <Map
                initialViewState={{
                    longitude: -90,
                    latitude: 40,
                    zoom: 3.0
                }}
                style={{ width: "100%", height: 300 }}
                // mapStyle="mapbox://styles/mapbox/satellite-v9"
                mapStyle="mapbox://styles/coachwayne/cl51c70js000e14pd04dq2hc7"

                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            >
                {

                    [...allEvents].reverse().map((event, key) => {
                        let today = new Date();
                        let yesterday = new Date(today);
                        yesterday.setDate(yesterday.getDate() - 1)
                        let yesterdayUnix = Math.floor(yesterday.getTime() / 1000);
                        let todayUnix = Math.floor(today.getTime() / 1000);
                        let unixEventDate = Math.floor(new Date(event.date).getTime() / 1000);

                        let istrue = unixEventDate >= yesterdayUnix;
                        if (istrue) {



                            if (!event.event_links.data[0]) {
                                return (
                                    null
                                )
                            }

                            else {
                                const Lat = Number(event.event_links.data[0].attributes.linkLabel)
                                const Long = Number(event.event_links.data[0].attributes.linkUrl)

                                return (
                                    <>
                                        <Marker
                                            key={`Marker:${key}`} event
                                            latitude={event.event_links.data[0] ? Lat : null}
                                            longitude={event.event_links.data[0] ? Long : null}
                                        >
                                            <button
                                                className="marker-btn"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    setSelectedEvent(event);
                                                    setUselessState(!uselessState);
                                                }}
                                            >
                                                {/* Make a next Image tag that will fill it's container */}
                                                {event.eventType === "WAR Zone" ? <div className="marker-btn">
                                                    <FaMapMarkerAlt color={'red'} fontSize={'1.25em'} />
                                                </div> : <div className="marker-btn" >
                                                    <FaMapMarkerAlt fontSize={'1.25em'} />
                                                </div>}
                                            </button>
                                        </Marker>
                                    </>
                                )
                            }
                        }

                    }
                    )
                }



                {uselessState ? (



                    <Popup
                        key={`PopUp:${selectedEvent.id}`}
                        latitude={selectedEvent.event_links.data[0].attributes.linkLabel}
                        longitude={selectedEvent.event_links.data[0].attributes.linkUrl}
                        onClose={() => {
                            setUselessState(false);
                        }}
                        style={{ zIndex: 100000 }}
                    >
                        <div>
                            <h2>{selectedEvent.name}</h2>
                            <p>{selectedEvent.address}</p>
                            <p>{formatedDate ? formatedDate : "No Date Provided"}</p>
                            <Link href={`/events/${selectedEvent.slug}`}><a>View Event</a></Link>
                        </div>
                    </Popup>
                ) : null}

                <FullscreenControl />
            </Map>
        </>
    )
}
```