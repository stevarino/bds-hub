export interface Entity {
    description: {
        identifier: string;
    };
    components?: {
        'minecraft:type_family'?: {
            family: string[];
        };
    };
}
export interface ClientEntity {
    description: {
        identifier: string;
        render_controllers: string[];
    };
}
export interface RenderContoller {
    render_controllers: {
        [key: string]: {
            arrays?: {
                textures?: {
                    'Array.skins'?: string[];
                };
            };
        };
    };
}
