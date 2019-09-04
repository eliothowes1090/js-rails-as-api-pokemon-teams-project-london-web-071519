class PokemonsController < ApplicationController

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        trainer_id = pokemon_params[:trainer_id]
        pokemon = Pokemon.create(trainer_id: trainer_id, nickname: name, species: species)

        render json: pokemon
    end

    def destroy
        # byebug
        pokemon = Pokemon.find_by(id: params[:id])
        Pokemon.destroy(pokemon.id)

        render json: {message: "Successfully set pokemon 'free'"}
    end


    private

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end

end
