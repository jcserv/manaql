CREATE TABLE Card (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE
    -- cmc INT NOT NULL,
    -- type VARCHAR(15) NOT NULL, -- new field, differs from scryfall
    -- type_line VARCHAR(127) NOT NULL,
    -- oracle_text VARCHAR(255) NOT NULL,
    -- power VARCHAR(7) NOT NULL, -- "+3"
    -- toughness VARCHAR(7) NOT NULL, -- "+3"
    -- colors TEXT[] NOT NULL,
    -- color_identity TEXT[] NOT NULL,
);

CREATE TABLE Printing (
    id SERIAL PRIMARY KEY NOT NULL,
    card_id SERIAL NOT NULL REFERENCES Card(id),
    set VARCHAR(7) NOT NULL,
    collector_number VARCHAR(7) NOT NULL
    -- rarity C, U, R, M
);

INSERT INTO Card (name) VALUES
    ('Animate Dead'),
    ('Arachnogenesis'),
    ('Assassin''s Trophy'),
    ('Azusa, Lost but Seeking'),
    ('Bala Ged Recovery // Bala Ged Sanctuary'),
    ('Baba Lysaga, Night Witch');

INSERT INTO Printing (card_id, set, collector_number) VALUES
    (1, 'MKC', '125'),
    (1, '30A', '92'),
    (1, 'PLST', 'EMA-78'),
    (2, 'DSC', '169'),
    (3, 'MKM', '187'),
    (4, 'CMM', '274'),
    (5, 'ZNR', '180'),
    (6, 'CLB', '266');