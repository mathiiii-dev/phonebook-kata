<?php

namespace App\Entity;

use App\Repository\PhoneBookRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PhoneBookRepository::class)]
class PhoneBook
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $lastname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Assert\Regex(
        pattern: '/^(\+)39[[:blank:]][0-9]{2}[[:blank:]][0-9]{7}$/i',
        message: 'Your phone is not correct',
    )]
    private string $phone_number;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phone_number;
    }

    public function setPhoneNumber(string $phone_number): self
    {
        $this->phone_number = $phone_number;

        return $this;
    }
}
