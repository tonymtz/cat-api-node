const responseFormatter = {};

responseFormatter.imageResponse = (data) => {
    data = data.data[ 0 ].images[ 0 ].image;

    let formatted;

    if (data.length > 1) {
        formatted = {
            images: data.map((image) => imageFactory(image))
        };
    } else {
        formatted = {
            image: imageFactory(data[ 0 ])
        };
    }

    return formatted;
};

module.exports = responseFormatter;

function imageFactory(data) {
    let image = {
        id: '0',
        url: 'https://i.imgur.com/2dczEvp.png'
    };

    // CATAPI lets you have id-less images...

    if (data.id) {
        image.id = data.id[ 0 ];
    }

    if (data.url) {
        image.url = data.url[ 0 ];
    }

    if (data.source_url) {
        image.source_url = data.source_url[ 0 ];
    }

    if (data.created) {
        image.created = data.created[ 0 ];
    }

    return image;
}
