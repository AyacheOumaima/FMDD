<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Intervenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class IntervenantFactory extends Factory
{
    /**
     * Le nom du modèle correspondant à la factory.
     *
     * @var string
     */
    protected $model = Intervenant::class;

    /**
     * Définir l'état par défaut du modèle.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'evenement_id' => Event::factory(),
            'nom' => $this->faker->lastName(),
            'prenom' => $this->faker->firstName(),
            'fonction' => $this->faker->jobTitle(),
            'email' => $this->faker->unique()->safeEmail(),
            'telephone' => $this->faker->phoneNumber(),
            'biographie' => $this->faker->paragraphs(3, true),
            'photo' => 'intervenants/' . $this->faker->image('public/storage/intervenants', 400, 400, null, false),
        ];
    }
}