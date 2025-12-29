<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_has_correct_role_after_registration(): void
    {
        $response = $this->postJson('/api/v1/register', [
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201);
        $this->assertEquals(User::ROLE_USER, $response->json('user.role'));
    }

    public function test_user_can_check_admin_role(): void
    {
        $admin = User::factory()->admin()->create();
        $this->assertTrue($admin->isAdmin());

        $user = User::factory()->create();
        $this->assertFalse($user->isAdmin());
    }

    public function test_user_can_check_super_admin_role(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        $this->assertTrue($superAdmin->isSuperAdmin());
        $this->assertTrue($superAdmin->isAdmin());

        $admin = User::factory()->admin()->create();
        $this->assertFalse($admin->isSuperAdmin());
        $this->assertTrue($admin->isAdmin());
    }

    public function test_user_can_check_formateur_role(): void
    {
        $formateur = User::factory()->formateur()->create();
        $this->assertTrue($formateur->isFormateur());
        $this->assertFalse($formateur->isAdmin());

        $user = User::factory()->create();
        $this->assertFalse($user->isFormateur());
    }

    public function test_user_can_check_adherent_role(): void
    {
        $adherent = User::factory()->adherent()->create();
        $this->assertTrue($adherent->isAdherent());
        $this->assertFalse($adherent->isAdmin());

        $user = User::factory()->create();
        $this->assertFalse($user->isAdherent());
    }

    public function test_user_has_role_method_works(): void
    {
        $user = User::factory()->create();
        $this->assertTrue($user->hasRole(User::ROLE_USER));
        $this->assertFalse($user->hasRole(User::ROLE_ADMIN));
    }

    public function test_user_has_any_role_method_works(): void
    {
        $admin = User::factory()->admin()->create();
        $this->assertTrue($admin->hasAnyRole([User::ROLE_ADMIN, User::ROLE_SUPER_ADMIN]));
        $this->assertFalse($admin->hasAnyRole([User::ROLE_SUPER_ADMIN]));
    }

    public function test_available_roles_are_correct(): void
    {
        $roles = User::availableRoles();
        $this->assertEquals([
            User::ROLE_USER,
            User::ROLE_ADMIN,
            User::ROLE_SUPER_ADMIN,
            User::ROLE_FORMATEUR,
            User::ROLE_ADHERENT,
        ], $roles);
    }
} 